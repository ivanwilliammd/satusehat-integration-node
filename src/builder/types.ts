// Builder-internal FHIR types — mirrors datatypes.ts but without toArray() constraints.
// These are plain payload-building interfaces, not domain objects.

export interface FhirIdentifier { system: string; value: string; }
export interface FhirCoding { system?: string; code?: string; display?: string; }
export interface FhirCodeableConcept { coding?: FhirCoding[]; text?: string; }
export interface FhirPeriod { start: string; end?: string; }
export interface FhirReference { reference: string; display?: string; }
export interface FhirHumanName { use?: string; text?: string; family?: string; given?: string[]; }
export interface FhirAddress { line?: string[]; city?: string; district?: string; state?: string; postalCode?: string; country?: string; }
export interface FhirContactPoint { system?: string; value?: string; use?: string; }
