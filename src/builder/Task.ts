/**
 * Task FHIR R4 Resource Builder
 * Ported from PHP: PayloadBuilderTask.php
 * Supports both typed objects and plain string args with auto-prefix.
 */

export class TaskBuilder {
  private data: Record<string, any> = { resourceType: 'Task' };

  private set(key: string, value: any): void { this.data[key] = value; }
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
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.set('id', id); return this; }

  addIdentifier(system: string, value: string): this {
    this.push('identifier', { system, value });
    return this;
  }

  setInstantiatesCanonical(canonical: string): this { this.set('instantiatesCanonical', canonical); return this; }
  setInstantiatesUri(uri: string): this { this.set('instantiatesUri', uri); return this; }

  setStatus(status: string): this {
    const valid = ['draft', 'requested', 'received', 'accepted', 'rejected', 'ready', 'cancelled', 'in-progress', 'on-hold', 'failed', 'completed', 'entered-in-error'];
    if (!valid.includes(status)) throw new Error(`Invalid status: ${status}`);
    this.set('status', status);
    return this;
  }

  setStatusReason(code: string, display?: string, system?: string): this {
    const coding: any = { code, display: display ?? code };
    if (system) coding.system = system;
    this.set('statusReason', { coding: [coding] });
    return this;
  }

  setBusinessStatus(code: string, display?: string, system?: string): this {
    const coding: any = { code, display: display ?? code };
    if (system) coding.system = system;
    this.set('businessStatus', { coding: [coding] });
    return this;
  }

  setIntent(intent: string): this {
    const valid = ['unknown', 'proposal', 'plan', 'order', 'original-order', 'reflex-order', 'filler-order', 'instance-order', 'option'];
    if (!valid.includes(intent)) throw new Error(`Invalid intent: ${intent}`);
    this.set('intent', intent);
    return this;
  }

  setPriority(priority: string): this { this.set('priority', priority); return this; }
  setCode(code: string, display?: string, system?: string): this {
    const coding: any = { code, display: display ?? code };
    if (system) coding.system = system;
    this.set('code', { coding: [coding] });
    return this;
  }
  setDescription(desc: string): this { this.set('description', desc); return this; }

  setFocus(ref: string, display?: string): this {
    const prefixed = this.autoPrefix(ref, 'QuestionnaireResponse');
    this.set('focus', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setFor(ref: string, display?: string): this {
    const prefixed = this.autoPrefix(ref, 'Patient');
    this.set('for', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setEncounter(ref: string, display?: string): this {
    const prefixed = this.autoPrefix(ref, 'Encounter');
    this.set('encounter', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setExecutionPeriod(start: string, end?: string): this {
    this.set('executionPeriod', { start, ...(end ? { end } : {}) });
    return this;
  }

  setAuthoredOn(dt: string): this { this.set('authoredOn', dt); return this; }
  setLastModified(dt: string): this { this.set('lastModified', dt); return this; }

  setRequester(ref: string, display?: string): this {
    const prefixed = this.autoPrefix(ref, 'Practitioner');
    this.set('requester', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setOwner(ref: string, display?: string): this {
    const prefixed = this.autoPrefix(ref, 'Practitioner');
    this.set('owner', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setLocation(ref: string, display?: string): this {
    const prefixed = this.autoPrefix(ref, 'Location');
    this.set('location', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  setReasonCode(code: string, display?: string, system?: string): this {
    const coding: any = { code, display: display ?? code };
    if (system) coding.system = system;
    this.push('reasonCode', { coding: [coding] });
    return this;
  }

  setReasonReference(ref: string, display?: string): this {
    const prefixed = this.autoPrefix(ref, 'Condition');
    this.push('reasonReference', { reference: prefixed, ...(display ? { display } : {}) });
    return this;
  }

  addInput(typeText: string, value: string): this {
    this.push('input', { type: { text: typeText }, valueString: value });
    return this;
  }

  addOutput(typeText: string, value: string): this {
    this.push('output', { type: { text: typeText }, valueString: value });
    return this;
  }

  addRestriction(ref: string, repetitions?: number): this {
    const prefixed = this.autoPrefix(ref, 'Patient');
    const restriction: any = { requester: { reference: prefixed } };
    if (repetitions !== undefined) restriction.repetitions = repetitions;
    this.push('restriction', restriction);
    return this;
  }

  addNote(text: string): this {
    this.push('note', { text });
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
