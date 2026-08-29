/**
 * DiagnosticReport FHIR R4 Resource Builder
 * @link https://www.hl7.org/fhir/diagnosticreport.html
 */
import { SharedBuilder } from './SharedBuilder';
import { CodeableConcept, Identifier, Reference } from '../datatype/datatypes';

export class DiagnosticReport extends SharedBuilder {
  constructor() { super(); this.data.resourceType = 'DiagnosticReport'; }

  setId(id: string): this { this.set('id', id); return this; }
  addIdentifier(identifier: Identifier): this { super.addIdentifier(identifier); return this; }
  setStatus(status: string): this { this.set('status', status); return this; }
  addCategory(category: CodeableConcept): this { this.push('category', this.nestedToArray(category)); return this; }
  setCode(code: CodeableConcept): this { this.set('code', this.nestedToArray(code)); return this; }
  setSubject(subject: Reference): this { this.set('subject', this.nestedToArray(subject)); return this; }
  setEncounter(encounter: Reference): this { this.set('encounter', this.nestedToArray(encounter)); return this; }
  setEffectiveDateTime(dateTime: string): this { this.set('effectiveDateTime', dateTime); return this; }
  setIssued(instant: string): this { this.set('issued', instant); return this; }
  addPerformer(performer: Reference): this { this.push('performer', this.nestedToArray(performer)); return this; }
  addResult(result: Reference): this { this.push('result', this.nestedToArray(result)); return this; }
  addSpecimen(specimen: Reference): this { this.push('specimen', this.nestedToArray(specimen)); return this; }
  addConclusionCode(conclusionCode: CodeableConcept): this { this.push('conclusionCode', this.nestedToArray(conclusionCode)); return this; }
  addBasedOn(basedOn: Reference): this { this.push('basedOn', this.nestedToArray(basedOn)); return this; }
  setConclusion(conclusion: string): this { this.set('conclusion', conclusion); return this; }
  addExtension(url: string, value: unknown, valueType?: string): this { super.addExtension(url, value, valueType); return this; }
}
