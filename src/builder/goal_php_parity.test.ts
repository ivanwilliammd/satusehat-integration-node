/** Goal must produce the same payload as PayloadBuilderGoal in the PHP SDK. */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Goal } from './Goal';
import { CodeableConcept, Coding, Identifier, Reference } from '../datatype/datatypes';
import { Quantity, Range } from '../datatype/datatypes';

const golden = JSON.parse(readFileSync(new URL('./testdata/goal_php_golden.json', import.meta.url), 'utf8'));

describe('Goal PHP parity', () => {
  it('matches the canonical payload', () => {
    const cc = (system: string, code: string, display: string) => {
      const c = new CodeableConcept();
      c.coding.push(new Coding(system, code, display));
      return c;
    };

    const b = new Goal();
    b.setId('goal-1');
    b.addIdentifier(new Identifier('http://sys-ids.kemkes.go.id/goal/1', 'goal-1'));
    b.setLifecycleStatus('active');
    b.setDescription(cc('http://snomed.info/sct', '386661006', 'Fever'));
    b.setSubject(new Reference('Patient/1000000001', 'Budi Santoso'));
    b.setStartDateTime('2026-01-05');
    const q = new Quantity();
    q.value = 120;
    q.unit = 'mmHg';
    q.system = 'http://unitsofmeasure.org';
    q.code = 'mm[Hg]';
    b.addTargetDetailQuantity(q);
    const low = new Quantity();
    low.value = 60;
    low.unit = 'bpm';
    const high = new Quantity();
    high.value = 100;
    high.unit = 'bpm';
    const r = new Range();
    r.low = low;
    r.high = high;
    b.addTargetRange(r);
    b.setStatusReason('Patient declined further follow-up');
    b.addNote('Target tekanan darah < 140/90');
    b.addOutcomeReference(new Reference('Observation/3000000001'));

    expect(b.build()).toEqual(golden);
  });
});
