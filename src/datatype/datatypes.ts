export interface Identifier { system: string; value: string; }
export interface HumanName { use?: string; text?: string; family?: string; given?: string[]; toArray(): any; }
export interface Address { line?: string[]; city?: string; district?: string; state?: string; postalCode?: string; country?: string; toArray(): any; }
export interface ContactPoint { system?: string; value?: string; use?: string; toArray(): any; }
export interface CodeableConcept { coding?: Coding[]; text?: string; toArray(): any; }
export interface Coding { system?: string; code?: string; display?: string; toArray(): any; }
export interface Reference { reference?: string; display?: string; toArray(): any; }
