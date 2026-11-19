/**
 * One CDA section: a coded heading with narrative text and, optionally, nested sections.
 *
 * Narrative is kept as XML rather than as a plain string because CDA narrative carries `<content>`,
 * `<paragraph>` and referenced elements; flattening it at parse time would destroy the only
 * human-readable part of the document.
 */
export class Section {
  constructor(
    public title: string = '',
    public text: string = '',
    public codes: Record<string, string> = {},
    public children: Section[] = [],
  ) {}

  /** LOINC code of this section, e.g. "10164-2" for History of present illness. */
  code(): string | null {
    if (this.codes[LOINC]) return this.codes[LOINC];
    const values = Object.values(this.codes);
    return values.length ? values[0] : null;
  }

  /** First section in the tree with this LOINC code, depth first. */
  find(loinc: string): Section | null {
    if (this.codes[LOINC] === loinc) return this;
    for (const child of this.children) {
      const hit = child.find(loinc);
      if (hit) return hit;
    }
    return null;
  }

  flatten(): Section[] {
    return [this, ...this.children.flatMap((c) => c.flatten())];
  }
}

export const LOINC = '2.16.840.1.113883.6.1';
