/**
 * MedicationStatement FHIR R4 Resource Builder
 * Ported from PHP: PayloadBuilderMedicationStatement.php
 * Supports both typed objects and plain string args with auto-prefix.
 */
import { CodeableConcept, Reference } from '../datatype/datatypes';

export class MedicationStatementBuilder {
  private data: Record<string, any> = { resourceType: 'MedicationStatement' };

  private set(key: string, value: any): void {
    this.data[key] = value;
  }

  private push(key: string, value: any): void {
    if (!this.data[key]) this.data[key] = [];
    this.data[key].push(value);
  }

  private autoPrefix(ref: string, resourceType: string): string {
    if (!/^(urn:|https?:\/\/)/.test(ref) && !ref.includes('/')) {
      return `${resourceType}/${ref}`;
    }
    return ref;
  }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(
        ([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0)
      )
    );
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(system: string, value: string): this {
    this.push('identifier', { system, value });
    return this;
  }

  setStatus(status: string): this { this.set('status', status); return this; }

  addStatusReason(code: string, display?: string, system?: string): this {
    const coding: any = { code, display: display ?? code };
    if (system) coding.system = system;
    this.push('statusReason', { coding: [coding] });
    return this;
  }

  setCategory(cc: CodeableConcept): this {
    this.set('category', (cc as any).toArray?.() ?? cc);
    return this;
  }

  setMedicationCodeableConcept(cc: CodeableConcept): this {
    this.set('medicationCodeableConcept', (cc as any).toArray?.() ?? cc);
    return this;
  }

  setMedicationReference(ref: string, display?: string): this {
    const prefixed = this.autoPrefix(ref, 'Medication');
    this.set('medicationReference', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setSubject(ref: string, display?: string): this {
    const prefixed = this.autoPrefix(ref, 'Patient');
    this.set('subject', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setContext(ref: string, display?: string): this {
    const prefixed = this.autoPrefix(ref, 'Encounter');
    this.set('context', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setDateAsserted(dateAsserted: string): this { this.set('dateAsserted', dateAsserted); return this; }
  setEffectiveDateTime(dt: string): this { this.set('effectiveDateTime', dt); return this; }

  setInformationSource(ref: string, display?: string): this {
    const prefixed = this.autoPrefix(ref, 'Patient');
    this.set('informationSource', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setDerivedFrom(ref: string): this {
    this.push('derivedFrom', { reference: ref });
    return this;
  }

  setReasonCode(cc: CodeableConcept): this {
    this.push('reasonCode', (cc as any).toArray?.() ?? cc);
    return this;
  }

  setReasonReference(ref: Reference): this {
    this.push('reasonReference', (ref as any).toArray?.() ?? ref);
    return this;
  }

  addNote(text: string): this {
    this.push('note', { text });
    return this;
  }

  addContained(resource: Record<string, any>): this {
    this.push('contained', resource);
    return this;
  }

  addDosageInstruction(
    text?: string,
    frequency?: number,
    period?: number,
    periodUnit?: string
  ): this {
    const dosage: any = {};
    if (text !== undefined) dosage.text = text;
    if (frequency !== undefined) {
      dosage.sequence = frequency;
      dosage.timing = { repeat: { frequency } };
    }
    if (period !== undefined) {
      dosage.timing = dosage.timing || {};
      dosage.timing.repeat = dosage.timing.repeat || {};
      dosage.timing.repeat.period = period;
    }
    if (periodUnit !== undefined) {
      dosage.timing = dosage.timing || {};
      dosage.timing.repeat = dosage.timing.repeat || {};
      dosage.timing.repeat.periodUnit = periodUnit;
    }
    this.push('dosage', dosage);
    return this;
  }

  addExtension(url: string, value: any, valueType?: string): this {
    const ext: any = { url };
    if (valueType) {
      ext[`value${valueType.charAt(0).toUpperCase()}${valueType.slice(1)}`] = value;
    } else {
      ext.valueString = typeof value === 'string' ? value : JSON.stringify(value);
    }
    this.push('extension', ext);
    return this;
  }
}
