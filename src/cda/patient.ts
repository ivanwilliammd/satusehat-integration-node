/**
 * The patient identity block: identifiers, name, sex and birth date.
 *
 * Identifiers keep their full (root, extension) pair. A NIK without its root cannot be matched
 * against anything, and dropping the root is how a local MRN silently becomes a national NIK.
 */
export class PatientRole {
  constructor(
    public identifiers: { root: string; extension: string }[] = [],
    public names: string[] = [],
    public administrativeGender: string = '',
    public birthTime: string = '',
  ) {}

  name(): string {
    return this.names[0] ?? '';
  }

  identifier(root: string): string {
    return this.identifiers.find((id) => id.root === root)?.extension ?? '';
  }
}
