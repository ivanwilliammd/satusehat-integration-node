import { describe, expect, it } from 'vitest';
import { BundleResponse } from './BundleResponse';
import { SSResponse } from './SSResponse';
import { SSValidationError } from './SSValidationError';

describe('SSResponse', () => {
  it('parses status, body, resourceId, and OperationOutcome errors', () => {
    const ok = new SSResponse(201, { resourceType: 'Patient', id: 'P001' }, '{"resourceType":"Patient","id":"P001"}');
    expect(ok.getHttpCode()).toBe(201);
    expect(ok.isSuccess()).toBe(true);
    expect(ok.isError()).toBe(false);
    expect(ok.getResourceId()).toBe('P001');
    expect(ok.get('Patient')).toBe('P001');

    const err = new SSResponse(
      422,
      {
        resourceType: 'OperationOutcome',
        issue: [
          { details: { text: 'RuleNumber: 10003 - Invalid Condition.code' } },
          { diagnostics: 'Missing subject reference' },
        ],
      },
      ''
    );
    expect(err.isError()).toBe(true);
    expect(err.getErrorMessages()).toEqual([
      'RuleNumber: 10003 - Invalid Condition.code',
      'Missing subject reference',
    ]);
  });

  it('extracts resource id from Bundle self link or first entry or patient_id', () => {
    const b1 = new SSResponse(
      200,
      {
        resourceType: 'Bundle',
        link: { self: { url: 'https://api-satusehat.kemkes.go.id/fhir-r4/v1/Encounter/enc-123?_ history=1' } },
      },
      ''
    );
    expect(b1.getResourceId()).toBe('enc-123');

    const b2 = new SSResponse(
      200,
      {
        resourceType: 'Bundle',
        entry: [{ resource: { id: 'obs-456' } }],
      },
      ''
    );
    expect(b2.getResourceId()).toBe('obs-456');

    const pCreate = new SSResponse(200, { success: true, data: { patient_id: 'pat-789' } }, '');
    expect(pCreate.getResourceId()).toBe('pat-789');
  });
});

describe('BundleResponse', () => {
  const sampleBundle = {
    resourceType: 'Bundle',
    type: 'transaction-response',
    total: 3,
    entry: [
      {
        fullUrl: 'urn:uuid:enc-1',
        response: {
          status: '201 Created',
          location: 'https://api-satusehat.kemkes.go.id/fhir-r4/v1/Encounter/enc-server-1/_history/1',
          etag: 'W/"1"',
          lastModified: '2026-01-01T00:00:00Z',
        },
      },
      {
        fullUrl: 'urn:uuid:cond-1',
        response: {
          status: '200 OK',
          location: 'Condition/cond-server-1',
        },
      },
      {
        fullUrl: 'urn:uuid:obs-1',
        response: {
          status: '422 Unprocessable Entity',
          outcome: {
            resourceType: 'OperationOutcome',
            issue: [{ diagnostics: 'Invalid LOINC code' }],
          },
        },
      },
    ],
  };

  const requestEntries = [
    { index: 0, method: 'POST', url: 'Encounter', fullUrl: 'urn:uuid:enc-1' },
    { index: 1, method: 'PUT', url: 'Condition/cond-server-1', fullUrl: 'urn:uuid:cond-1' },
    { index: 2, method: 'POST', url: 'Observation', fullUrl: 'urn:uuid:obs-1' },
  ];

  it('extracts entries, statuses, success/failed entries, and resource IDs', () => {
    const br = new BundleResponse(200, sampleBundle, requestEntries);
    expect(br.isSuccess()).toBe(true);
    expect(br.getTotal()).toBe(3);
    expect(br.getEntryStatuses()).toEqual(['201 Created', '200 OK', '422 Unprocessable Entity']);
    expect(br.getSuccessEntries().length).toBe(2);
    expect(br.getFailedEntries().length).toBe(1);
    expect(br.getEntryResourceId(0)).toBe('1');
    expect(br.getEntryResourceId(1)).toBe('cond-server-1');
    expect(br.getEntryErrors(2)).toEqual(['Invalid LOINC code']);
    expect(br.isAllSuccess()).toBe(false);
  });

  it('supports byMethod, created, updated, idMap, and find', () => {
    const br = new BundleResponse(200, sampleBundle, requestEntries);
    expect(br.created().length).toBe(2);
    expect(br.updated().length).toBe(1);
    expect(br.idMap()).toEqual({ 'urn:uuid:enc-1': '1' });

    const found = br.find('Condition', 'cond-server-1');
    expect(found).not.toBeNull();
    expect(found?.statusCode).toBe(200);
  });
});

describe('SSValidationError', () => {
  it('preserves all 558 rule numbers and 14 response types', () => {
    const rules = SSValidationError.getAvailableRuleNumbers();
    expect(rules.length).toBe(558);
    expect(Object.keys(SSValidationError.RESPONSE_TYPES).length).toBe(14);
    expect(SSValidationError.getResponseType('duplicate')?.title).toBe('Found duplicate resource');
  });

  it('parses OperationOutcome issues and enriches with RULE_MAP metadata', () => {
    const resp = new SSResponse(
      400,
      {
        resourceType: 'OperationOutcome',
        issue: [
          {
            severity: 'error',
            code: 'invalid',
            details: { text: 'RuleNumber: 10003 Invalid coding system' },
            expression: ['Condition.code'],
          },
          {
            severity: 'error',
            code: 'duplicate',
            details: { text: 'Duplicate record found with Invalid date time format' },
            expression: ['Condition.recordedDate'],
          },
        ],
      },
      ''
    );

    const val = SSValidationError.fromResponse(resp);
    expect(val.getRuleNumbers()).toEqual([10003]);
    expect(val.getRuleInfo(10003)?.path).toBe('Condition.code');
    expect(val.isDuplicate()).toBe(true);
    expect(val.isDateTimeError()).toBe(true);
    expect(val.getAffectedPaths()).toEqual(['Condition.code', 'Condition.recordedDate']);

    const parsed = val.getParsedIssues();
    expect(parsed.length).toBe(2);
    expect(parsed[0].rule_number).toBe(10003);
    expect(parsed[0].response_type).toBe('invalid_coding_system');
    expect(val.getSummary()).toContain('[10003] Condition.code =>');

    const condRules = SSValidationError.getRulesForResource('Condition');
    expect(Object.keys(condRules).length).toBeGreaterThan(0);

    const loincRules = SSValidationError.searchRules('loinc');
    expect(Object.keys(loincRules).length).toBeGreaterThan(0);
  });
});
