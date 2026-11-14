/**
 * NutritionOrderParser — typed accessors over the official SATUSEHAT NutritionOrder payload.
 *
 * Shape source: satusehat-conformance/examples/satusehat/NutritionOrder.json, copied unchanged to
 * src/parser/testdata/NutritionOrder.json. One accessor per element the official example contains;
 * getRaw() always returns the payload so a caller is never blocked by a missing accessor.
 */
export class NutritionOrderParser {
  private payload: Record<string, any>;

  constructor(payload: Record<string, any> = {}) {
    this.payload = payload ?? {};
  }

  getRaw(): Record<string, any> {
    return this.payload;
  }

  getResourceType(): any {
    return this.payload['resourceType'] ?? null;
  }

  getIdentifier(): any {
    return this.payload['identifier'] ?? null;
  }

  getStatus(): any {
    return this.payload['status'] ?? null;
  }

  getIntent(): any {
    return this.payload['intent'] ?? null;
  }

  getPatient(): any {
    return this.payload['patient'] ?? null;
  }

  getEncounter(): any {
    return this.payload['encounter'] ?? null;
  }

  getDateTime(): any {
    return this.payload['dateTime'] ?? null;
  }

  getOralDiet(): any {
    return this.payload['oralDiet'] ?? null;
  }
}
