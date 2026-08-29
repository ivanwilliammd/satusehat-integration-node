import { Coding } from './datatypes';

describe('Coding', () => {
  it('should have correct system', () => {
    const c: Coding = { system: 'http://snomed.info/sct', code: '123', display: 'Test' };
    expect(c.system).toBe('http://snomed.info/sct');
  });
});
