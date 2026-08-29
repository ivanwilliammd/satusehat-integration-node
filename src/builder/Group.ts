/** Group FHIR R4 Resource Builder */

export class GroupBuilder {
  private data: Record<string, any> = { resourceType: 'Group' };

  build(): Record<string, any> {
    return Object.fromEntries(
      Object.entries(this.data).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
    );
  }

  setType(type_: string): this { this.data['type'] = type_; return this; }
  setActive(active: boolean): this { this.data['active'] = active; return this; }
  setName(name: string): this { this.data['name'] = name; return this; }
  setQuantity(quantity: number): this { this.data['quantity'] = quantity; return this; }
  addMemberEntity(reference: string): this {
    if (!this.data['member']) this.data['member'] = [];
    (this.data['member'] as any[]).push({ entity: { reference } });
    return this;
  }
}
