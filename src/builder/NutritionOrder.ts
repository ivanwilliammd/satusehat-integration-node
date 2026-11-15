/**
 * NutritionOrder FHIR R4 Resource Builder.
 *
 * Setara PayloadBuilderNutritionOrder.php (15 method). Tiga quirk kanon ditiru dan
 * ditandai:
 * - `setOralDietType` dinamai "set" tetapi MENUMPUK (R4 oralDiet.type 0..*);
 * - `addAllergyType` menulis `allergyType`, padahal R4 memakai `allergyIntolerance`
 *   bertipe Reference — nama dan tipe sama-sama tidak cocok;
 * - `oralDiet` dibuat lebih dulu sebagai wadah, lalu diisi lewat jalur `oralDiet/type`.
 */
import { Reference } from '../datatype/datatypes';

export class NutritionOrder {
  private data: Record<string, any> = { resourceType: 'NutritionOrder' };

  private arr(nilai: any): any {
    return typeof nilai?.toArray === 'function' ? nilai.toArray() : nilai;
  }

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  private push(key: string, value: any): void {
    if (!Array.isArray(this.data[key])) this.data[key] = [];
    this.data[key].push(value);
  }

  /** Meniru Builder::push('oralDiet/type') di PHP: pastikan wadahnya dulu. */
  private pushDi(wadah: string, key: string, value: any): void {
    if (typeof this.data[wadah] !== 'object' || this.data[wadah] === null || Array.isArray(this.data[wadah])) {
      this.data[wadah] = {};
    }
    if (!Array.isArray(this.data[wadah][key])) this.data[wadah][key] = [];
    this.data[wadah][key].push(value);
  }

  setId(id: string): this { this.data['id'] = id; return this; }
  addIdentifier(identifier: any): this { this.push('identifier', this.arr(identifier)); return this; }
  setStatus(status: string): this { this.data['status'] = status; return this; }
  setIntent(intent: string): this { this.data['intent'] = intent; return this; }
  setPatient(ref: Reference): this { this.data['patient'] = this.arr(ref); return this; }
  setEncounter(ref: Reference): this { this.data['encounter'] = this.arr(ref); return this; }
  setDateTime(dateTime: string): this { this.data['dateTime'] = dateTime; return this; }
  setOrderer(ref: Reference): this { this.data['orderer'] = this.arr(ref); return this; }

  addAllergyType(cc: any): this { this.push('allergyType', this.arr(cc)); return this; }
  addFoodPreferenceModifier(cc: any): this { this.push('foodPreferenceModifier', this.arr(cc)); return this; }
  addExcludeFoodModifier(cc: any): this { this.push('excludeFoodModifier', this.arr(cc)); return this; }

  setOralDietType(cc: any): this { this.pushDi('oralDiet', 'type', this.arr(cc)); return this; }
  addOralDietSchedule(timing: any): this { this.pushDi('oralDiet', 'schedule', this.arr(timing)); return this; }

  addSupplement(supplement: Record<string, any>): this { this.push('supplement', supplement); return this; }
  setEnteralFormula(formula: Record<string, any>): this { this.data['enteralFormula'] = formula; return this; }
}
