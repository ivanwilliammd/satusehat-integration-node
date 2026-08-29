/** Specimen FHIR R4 Resource Builder */
import { CodeableConcept, Identifier, Quantity, Reference } from '../datatype/datatypes';

export class Specimen {
  private data: Record<string, any> = { resourceType: 'Specimen' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setType(type: CodeableConcept): this { this.data['type'] = type.toArray(); return this; }
  setSubject(subject: Reference): this { this.data['subject'] = subject.toArray(); return this; }
  addIdentifier(identifier: Identifier): this {
    this.data['identifier'] = this.data['identifier'] || [];
    this.data['identifier'].push(identifier.toArray());
    return this;
  }
  setReceivedTime(dateTime: string): this { this.data['receivedTime'] = dateTime; return this; }
  setCollectedDateTime(dateTime: string): this {
    this.data['collection'] = this.data['collection'] || {};
    this.data['collection']['collectedDateTime'] = dateTime;
    return this;
  }
  setCollector(collector: Reference): this {
    this.data['collection'] = this.data['collection'] || {};
    this.data['collection']['collector'] = collector.toArray();
    return this;
  }
  setFastingStatusCodeableConcept(status: CodeableConcept): this {
    this.data['collection'] = this.data['collection'] || {};
    this.data['collection']['fastingStatusCodeableConcept'] = status.toArray();
    return this;
  }
  setMethod(method: CodeableConcept): this {
    this.data['collection'] = this.data['collection'] || {};
    this.data['collection']['method'] = method.toArray();
    return this;
  }
  setQuantity(quantity: Quantity): this {
    this.data['collection'] = this.data['collection'] || {};
    this.data['collection']['quantity'] = quantity.toArray();
    return this;
  }
  setBodySite(bodySite: CodeableConcept): this {
    this.data['collection'] = this.data['collection'] || {};
    this.data['collection']['bodySite'] = bodySite.toArray();
    return this;
  }
  addRequest(request: Reference): this {
    this.data['request'] = this.data['request'] || [];
    this.data['request'].push(request.toArray());
    return this;
  }
  addCondition(text: string): this {
    this.data['condition'] = this.data['condition'] || [];
    this.data['condition'].push({ text });
    return this;
  }
  addProcessing(timeDateTime: string): this {
    this.data['processing'] = this.data['processing'] || [];
    this.data['processing'].push({ timeDateTime });
    return this;
  }
  addExtension(url: string, value: string): this {
    this.data['extension'] = this.data['extension'] || [];
    this.data['extension'].push({ url, valueString: value });
    return this;
  }
  addTransportedTime(dateTime: string): this {
    this.data['extension'] = this.data['extension'] || [];
    this.data['extension'].push({ url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/TransportedTime', valueDateTime: dateTime });
    return this;
  }
  addTransportedPerson(name: string, telecom: string[] = []): this {
    this.data['extension'] = this.data['extension'] || [];
    this.data['extension'].push({ url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/TransportedPerson', valueContactDetail: { name, telecom } });
    return this;
  }
  addReceivedPerson(person: Reference): this {
    this.data['extension'] = this.data['extension'] || [];
    this.data['extension'].push({ url: 'https://fhir.kemkes.go.id/r4/StructureDefinition/ReceivedPerson', valueReference: person.toArray() });
    return this;
  }
}
