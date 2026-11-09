export class GroupParser {
  private group: Record<string, any>;

  constructor(group: Record<string, any> = {}) {
    this.group = group ?? {};
  }

  getIdentifiers(): any {
    return this.group['identifier'] ?? null;
  }

  getActive(): any {
    return this.group['active'] ?? null;
  }

  getType(): any {
    return this.group['type'] ?? null;
  }

  getActual(): any {
    return this.group['actual'] ?? null;
  }

  getCode(): any {
    return this.group['code'] ?? null;
  }

  getName(): any {
    return this.group['name'] ?? null;
  }

  getQuantity(): any {
    return this.group['quantity'] ?? null;
  }

  getManagingEntity(): any {
    return this.group['managingEntity'] ?? null;
  }

  getMembers(): any {
    return this.group['member'] ?? null;
  }
}
