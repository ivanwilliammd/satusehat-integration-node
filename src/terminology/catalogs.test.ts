// Counts come from the PHP catalog dump. Regenerating a catalog moves these numbers with the
// data; a mismatch means the generated file is out of date.
import { describe, it, expect } from 'vitest';
import { familyRelationshipCatalogs } from './FamilyRelationship';
import { occupationCatalogs } from './Occupation';
import { immunizationTerminologyCatalogs } from './ImmunizationTerminology';
import { compositionTerminologyCatalogs } from './CompositionTerminology';
import { medicationTerminologyCatalogs } from './MedicationTerminology';

describe('terminology catalogs match PHP', () => {
  it('FamilyRelationship.relationshipCodes has 105 codes', () => {
    expect(Object.keys(familyRelationshipCatalogs.relationshipCodes)).toHaveLength(105);
  });

  it('Occupation.performer_role has 512 codes', () => {
    expect(Object.keys(occupationCatalogs.performer_role)).toHaveLength(512);
  });

  it('ImmunizationTerminology.vaccine_map has 39 entries', () => {
    expect(Object.keys(immunizationTerminologyCatalogs.vaccine_map)).toHaveLength(39);
  });

  it('CompositionTerminology has type/category/section sizes 2/125/84', () => {
    expect(Object.keys(compositionTerminologyCatalogs.type)).toHaveLength(2);
    expect(Object.keys(compositionTerminologyCatalogs.category)).toHaveLength(125);
    expect(Object.keys(compositionTerminologyCatalogs.section)).toHaveLength(84);
  });

  it('MedicationTerminology has 14 groups', () => {
    expect(Object.keys(medicationTerminologyCatalogs)).toHaveLength(14);
  });
});
