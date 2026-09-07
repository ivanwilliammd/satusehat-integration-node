import { describe, it, expect, vi, afterEach } from 'vitest';
import axios from 'axios';
import { TerminologyClient } from './TerminologyClient';

vi.mock('axios');

const mockedAxios = vi.mocked(axios, true);

/** Stub axios.create → instance whose .request/.post resolve dengan data. */
function mockInstance(data: unknown, status = 200) {
  const instance = {
    request: vi.fn().mockResolvedValue({ status, data }),
    post: vi.fn().mockResolvedValue({ status: 200, data: { access_token: 'x', expires_in: 3600 } }),
  };
  mockedAxios.create.mockReturnValue(instance as unknown as ReturnType<typeof axios.create>);
  return instance;
}

afterEach(() => {
  vi.clearAllMocks();
});

describe('TerminologyClient', () => {
  it('searchSystem kfa_alkes hits path + params q benar', async () => {
    const inst = mockInstance({ results: [] });
    const client = new TerminologyClient({ token: 'pat' });
    const res = await client.searchSystem('kfa_alkes', 'termometer', 5);
    expect(inst.request).toHaveBeenCalledTimes(1);
    const call = inst.request.mock.calls[0][0];
    expect(call.url).toBe('api/v1/terminology/kfa_alkes/search');
    expect(call.params).toEqual({ q: 'termometer', limit: 5 });
    expect(res).toEqual({ results: [] });
  });

  it('query chaining on kptl limit 10 → path api/v1/terminology/kptl/search', async () => {
    const inst = mockInstance({ results: [] });
    const client = new TerminologyClient({ token: 'pat' });
    await client.query('pemasangan kateter').on('kptl').limit(10).get();
    const call = inst.request.mock.calls[0][0];
    expect(call.url).toBe('api/v1/terminology/kptl/search');
    expect(call.params).toEqual({ q: 'pemasangan kateter', limit: 10 });
  });

  it('asCode kode 93004944 → validate POST body system kfa', async () => {
    const inst = mockInstance({ valid: true });
    const client = new TerminologyClient({ token: 'pat' });
    const res = await client.query('93004944').asCode().get();
    const call = inst.request.mock.calls[0][0];
    expect(call.method).toBe('POST');
    expect(call.url).toBe('api/v1/terminology/validate');
    expect(call.data).toEqual({ system: 'kfa', code: '93004944' });
    expect(res).toEqual({ valid: true });
  });

  it('status 401 throw', async () => {
    mockInstance({ message: 'unauthorized' }, 401);
    const client = new TerminologyClient({ token: 'pat' });
    await expect(client.search('demam')).rejects.toThrow('TerminologyClient HTTP 401');
  });
});
