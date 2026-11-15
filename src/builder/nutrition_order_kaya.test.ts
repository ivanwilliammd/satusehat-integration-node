/**
 * NutritionOrder: 15 setter kanon, diuji terhadap payload PHP yang sama dengan uji Python.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { NutritionOrder } from './NutritionOrder';

const golden = () =>
  JSON.parse(readFileSync(new URL('./testdata/nutrition_order_kaya_php_golden.json', import.meta.url), 'utf8'));

function isi(): NutritionOrder {
  return new NutritionOrder()
    .setId('no-1')
    .addIdentifier({ system: 'http://sys.id/ni', value: 'NI-1900' })
    .setStatus('active')
    .setIntent('order')
    .setPatient({ reference: 'Patient/1000000001' } as any)
    .setEncounter({ reference: 'Encounter/enc-1' } as any)
    .setDateTime('2026-01-06T08:00:00+07:00')
    .setOrderer({ reference: 'Practitioner/1000000002' } as any)
    .addAllergyType({ coding: [{ system: 'http://sys.id/alergi', code: 'A1', display: 'Seafood' }], text: 'Alergi seafood' } as any)
    .addFoodPreferenceModifier({ coding: [{ system: 'http://hl7.org/fhir/diet', code: 'VEG', display: 'Vegetarian' }] } as any)
    .addExcludeFoodModifier({ text: 'Kacang' } as any)
    .setOralDietType({ coding: [{ system: 'http://sys.id/diet', code: 'RG', display: 'Rendah Garam' }], text: 'Diet rendah garam' } as any)
    .setOralDietType({ text: 'Diet lunak' } as any)
    .addOralDietSchedule({ repeat: { frequency: 3, period: 1, periodUnit: 'd' } } as any)
    .addSupplement({ type: { text: 'Suplemen zat besi' }, productName: 'Ferrous' })
    .setEnteralFormula({ baseFormulaType: { text: 'Formula standar' }, caloricDensity: { value: 1.0 } });
}

describe('NutritionOrder setara PHP', () => {
  it('payload penuh sama dengan golden PHP', () => {
    expect(isi().build()).toEqual(golden());
  });

  it('setOralDietType menumpuk meski dinamai set', () => {
    expect(isi().build().oralDiet.type).toHaveLength(2);
  });

  it('oralDiet.schedule berada DI DALAM oralDiet, bukan di akar payload', () => {
    const hasil = isi().build();
    expect(hasil.schedule).toBeUndefined();
    expect(hasil.oralDiet.schedule[0].repeat.frequency).toBe(3);
  });

  it('quirk allergyType: bukan elemen R4 (R4 memakai allergyIntolerance)', () => {
    const hasil = isi().build();
    expect(hasil.allergyType).toBeDefined();
    expect(hasil.allergyIntolerance).toBeUndefined();
  });
});
