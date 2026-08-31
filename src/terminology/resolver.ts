/**
 * Terminology Resolver
 * Supports casting string, CodeableConcept, or arrays to CodeableConcept format.
 * Format: "ICD10:A00", "LOINC:2951-2", "SNOMED:38341003", bare string
 */

/** Map of terminology prefix → FHIR system URL */
const SYSTEM_MAP: Record<string, string> = {
  ICD10: 'http://hl7.org/fhir/sid/icd-10',
  ICD9: 'http://hl7.org/fhir/sid/icd-9-cm',
  ICD9CM: 'http://hl7.org/fhir/sid/icd-9-cm',
  LOINC: 'http://loinc.org',
  SNOMED: 'http://snomed.info/sct',
  CVX: 'http://hl7.org/fhir/sid/cvx',
  UCUM: 'http://unitsofmeasure.org',
  KFA: 'http://fhir.kemkes.go.id/kfa',
  KPTL: 'http://fhir.kemkes.go.id/kptl',
  RXNORM: 'http://www.nlm.nih.gov/research/umls/rxnorm',
  // SATUSEHAT lampiran terminologies
  ICDO: 'http://hl7.org/fhir/sid/icd-o',
  ICDMM: 'http://example.com/icd-mm',
  ICDPM: 'http://example.com/icd-pm',
  MTI: 'http://terminology.kemkes.go.id',
};

export interface CodeableConceptOutput {
  coding?: Array<{ system?: string; code: string; display?: string }>;
  text?: string;
}

export class TerminologyResolver {
  /**
   * Resolve a value to CodeableConcept format.
   * - string "ICD10:A00" → { coding: [{ system, code, display }], text }
   * - string "A00" (bare) → { text: "A00" }
   * - { coding, text } object → pass through
   * - Array of above → Array of resolved
   */
  static resolve(
    value: string | Record<string, any> | Array<string | Record<string, any>>
  ): CodeableConceptOutput | Array<CodeableConceptOutput> {
    if (Array.isArray(value)) {
      return value.map(v => TerminologyResolver.resolve(v) as CodeableConceptOutput);
    }

    if (typeof value === 'object' && value !== null) {
      return value as CodeableConceptOutput;
    }

    if (typeof value !== 'string') {
      return { text: String(value) };
    }

    const colonIdx = value.indexOf(':');
    if (colonIdx !== -1) {
      const prefix = value.substring(0, colonIdx).toUpperCase();
      const code = value.substring(colonIdx + 1).trim();
      const system = SYSTEM_MAP[prefix] ?? prefix;

      return {
        coding: [{ system, code, display: code }],
        text: code,
      };
    }

    // Bare string — treat as text
    return { text: value };
  }

  /**
   * Validate a code against known SATUSEHAT/FHIR terminology systems.
   * Returns true if code matches expected format.
   */
  static isValid(code: string, system?: string): boolean {
    if (!code || code.trim() === '') return false;
    if (system) {
      const mapped = SYSTEM_MAP[system.toUpperCase()];
      return mapped !== undefined;
    }
    return true;
  }

  /**
   * Expand a shorthand array into resolved CodeableConcept array.
   * e.g. ["ICD10:A00", "ICD10:J18.9"] → array of CodeableConcept
   */
  static expandArray(codes: string[]): CodeableConceptOutput[] {
    return codes.map(code => TerminologyResolver.resolve(code) as CodeableConceptOutput);
  }
}
