import { describe, expect, it } from 'vitest';
import { OAuth2Client, OAuth2ClientException } from './OAuth2Client';
import { SSRequest } from './SSRequest';

describe('OAuth2Client', () => {
  it('throws when SATUSEHAT_ENV is missing and override is false', () => {
    const oldEnv = process.env.SATUSEHAT_ENV;
    delete process.env.SATUSEHAT_ENV;
    try {
      expect(() => new OAuth2Client()).toThrow(OAuth2ClientException);
    } finally {
      if (oldEnv !== undefined) process.env.SATUSEHAT_ENV = oldEnv;
    }
  });

  it('throws when SATUSEHAT_ENV is invalid', () => {
    expect(() => new OAuth2Client({ env: 'INVALID' })).toThrow(OAuth2ClientException);
  });

  it('throws when DEV credentials are missing', () => {
    expect(() => new OAuth2Client({ env: 'DEV', clientId: 'id-only' })).toThrow(
      OAuth2ClientException
    );
  });

  it('configures DEV, STG, and PROD URLs properly', () => {
    const dev = new OAuth2Client({
      env: 'DEV',
      clientId: 'cid',
      clientSecret: 'csec',
      organizationId: 'org1',
    });
    expect(dev.base_url).toBe('https://api-satusehat-dev.dto.kemkes.go.id');
    expect(dev.auth_url).toBe('https://api-satusehat-dev.dto.kemkes.go.id/oauth2/v1');
    expect(dev.fhir_url).toBe('https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1');

    const stg = new OAuth2Client({
      env: 'STG',
      clientId: 'cid',
      clientSecret: 'csec',
      organizationId: 'org1',
    });
    expect(stg.base_url).toBe('https://api-satusehat-stg.dto.kemkes.go.id');

    const prod = new OAuth2Client({
      env: 'PROD',
      clientId: 'cid',
      clientSecret: 'csec',
      organizationId: 'org1',
    });
    expect(prod.base_url).toBe('https://api-satusehat.kemkes.go.id');
  });

  it('fetches and caches token, and refreshes on refreshToken()', async () => {
    let tokenCalls = 0;
    const client = new OAuth2Client({
      env: 'DEV',
      clientId: 'cid',
      clientSecret: 'csec',
      organizationId: 'org1',
      transport: async () => {
        tokenCalls++;
        return {
          status: 200,
          data: { access_token: `tok-${tokenCalls}`, expires_in: 3600 },
        };
      },
    });

    const t1 = await client.token();
    const t2 = await client.token();
    expect(t1).toBe('tok-1');
    expect(t2).toBe('tok-1');
    expect(tokenCalls).toBe(1);

    const t3 = await client.refreshToken();
    expect(t3).toBe('tok-2');
    expect(tokenCalls).toBe(2);
  });

  it('supports getById, getByNik, kfaGet, post, and put', async () => {
    const calls: Array<{ method: string; url: string }> = [];
    const client = new OAuth2Client({
      env: 'DEV',
      clientId: 'cid',
      clientSecret: 'csec',
      organizationId: 'org1',
      transport: async (method, url) => {
        calls.push({ method, url });
        if (url.includes('/accesstoken')) {
          return { status: 200, data: { access_token: 'tok-xyz' } };
        }
        return {
          status: 200,
          data: { resourceType: 'Patient', id: 'P123' },
        };
      },
    });

    const [s1, d1] = await client.getById('Patient', 'P123');
    expect(s1).toBe(200);
    expect(d1.id).toBe('P123');

    const [s2] = await client.getByNik('Patient', '3171000000000001');
    expect(s2).toBe(200);
    expect(calls[calls.length - 1].url).toContain(
      'Patient?identifier=https://fhir.kemkes.go.id/id/nik|3171000000000001'
    );

    const [s3] = await client.kfaGet('products/all?', 'page=1&size=10');
    expect(s3).toBe(200);
    expect(calls[calls.length - 1].url).toContain('/kfa-v2/products/all?page=1&size=10');

    const [s4] = await client.post('Patient', { resourceType: 'Patient' });
    expect(s4).toBe(200);

    const [s5] = await client.put('Patient', 'P123', { resourceType: 'Patient', id: 'P123' });
    expect(s5).toBe(200);
  });
});

describe('SSRequest', () => {
  it('performs GET, POST, PUT, DELETE, PATCH, patchFhirPath, and postBundle', async () => {
    const seen: Array<{ method: string; url: string; headers: Record<string, string>; body: string | null }> = [];
    const req = new SSRequest(null, 'static-token', 'https://example.com/fhir-r4/v1', {
      transport: (method, url, headers, body) => {
        seen.push({ method, url, headers, body: body ?? null });
        return {
          status: 200,
          data: { resourceType: 'Patient', id: 'pat-1' },
        };
      },
    });

    const rGet = await req.get('Patient', { name: 'Budi' });
    expect(rGet.isSuccess()).toBe(true);
    expect(rGet.getResourceId()).toBe('pat-1');
    expect(seen[0].url).toBe('https://example.com/fhir-r4/v1/Patient?name=Budi');
    expect(seen[0].headers['Authorization']).toBe('Bearer static-token');

    await req.post('Patient', { resourceType: 'Patient' });
    expect(seen[1].method).toBe('POST');

    await req.put('Patient/pat-1', { resourceType: 'Patient', id: 'pat-1' });
    expect(seen[2].method).toBe('PUT');

    await req.delete('Patient/pat-1');
    expect(seen[3].method).toBe('DELETE');

    await req.patch('Patient/pat-1', [{ op: 'replace', path: '/active', value: true }]);
    expect(seen[4].method).toBe('PATCH');
    expect(seen[4].headers['Content-Type']).toBe('application/json-patch+json');

    await req.patchFhirPath('Patient/pat-1', { resourceType: 'Parameters' });
    expect(seen[5].method).toBe('PATCH');
    expect(seen[5].headers['Content-Type']).toBe('application/fhir+json');

    await req.postBundle('Bundle', { resourceType: 'Bundle', type: 'transaction' });
    expect(seen[6].method).toBe('POST');
  });

  it('auto-refreshes token on 401 and retries', async () => {
    let tokenVer = 1;
    const oauth = new OAuth2Client({
      env: 'DEV',
      clientId: 'cid',
      clientSecret: 'csec',
      organizationId: 'org1',
      transport: () => ({
        status: 200,
        data: { access_token: `token-v${tokenVer++}` },
      }),
    });

    let attempts = 0;
    const req = new SSRequest(oauth, null, null, {
      sleepFn: () => {},
      transport: (_method, _url, headers) => {
        attempts++;
        if (attempts === 1) {
          expect(headers['Authorization']).toBe('Bearer token-v1');
          return { status: 401, data: { resourceType: 'OperationOutcome' } };
        }
        expect(headers['Authorization']).toBe('Bearer token-v2');
        return { status: 200, data: { resourceType: 'Observation', id: 'obs-99' } };
      },
    });

    const res = await req.get('Observation/obs-99');
    expect(res.isSuccess()).toBe(true);
    expect(res.getResourceId()).toBe('obs-99');
    expect(attempts).toBe(2);
  });

  it('retries on 429 with Retry-After and 5xx with exponential backoff up to maxRetries', async () => {
    const sleeps: number[] = [];
    let callCount = 0;

    const req = new SSRequest(null, 'tok', 'https://example.com/fhir', {
      maxRetries: 3,
      sleepFn: (sec) => {
        sleeps.push(sec);
      },
      transport: () => {
        callCount++;
        if (callCount === 1) {
          return { status: 429, headers: { 'Retry-After': '5' }, data: {} };
        }
        if (callCount === 2) {
          return { status: 503, data: {} };
        }
        return { status: 201, data: { resourceType: 'Condition', id: 'cond-1' } };
      },
    });

    const res = await req.post('Condition', { resourceType: 'Condition' });
    expect(res.getHttpCode()).toBe(201);
    expect(res.getResourceId()).toBe('cond-1');
    expect(sleeps).toEqual([5, 4]);
  });
});
