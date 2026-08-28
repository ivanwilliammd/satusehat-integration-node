export class PatientBuilder {
  private data: any = { resourceType: 'Patient' };

  setName(name: string): this {
    this.data.name = [{ use: 'official', text: name }];
    return this;
  }

  toJSON(): any {
    return this.data;
  }
}
