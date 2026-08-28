export interface Identifier { system: string; value: string; }
export interface CodeableConcept { coding?: Coding[]; text?: string; }
export interface Coding { system?: string; code?: string; display?: string; }
export interface Reference { reference?: string; display?: string; }
