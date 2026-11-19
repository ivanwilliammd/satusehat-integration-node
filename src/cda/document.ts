import { XMLBuilder, XMLParser, XMLValidator } from 'fast-xml-parser';
import { PatientRole } from './patient';
import { LOINC, Section } from './section';

export const CDA_NS = 'urn:hl7-org:v3';

/**
 * Node shape produced with `preserveOrder`. Each element is a single-key object whose value is the
 * child array; attributes live under ':@'. Keeping the parse tree — instead of mapping it into our
 * own model — is what lets `toXml()` write back structures this SDK never looked at.
 */
type Node = Record<string, unknown>;
type Tree = Node[];

const parser = new XMLParser({
  preserveOrder: true,
  ignoreAttributes: false,
  attributeNamePrefix: '',
  trimValues: false,
  parseTagValue: false,
  processEntities: true,
});

const builder = new XMLBuilder({ preserveOrder: true, ignoreAttributes: false, attributeNamePrefix: '', format: true });

/**
 * HL7 CDA R2 ClinicalDocument: parse, inspect, and build the minimum document a record exchange
 * actually needs.
 *
 * Scope is deliberate. CDA R2 is hundreds of pages of optional structure; what gets used is the
 * header (who, what, when, where, signed by whom) and the sections with narrative text. Those are
 * modelled. Everything else is preserved in the tree and written back untouched, so a document
 * containing structures this class does not understand survives a round trip instead of being
 * truncated by the SDK.
 *
 * The HL7 CDA R2 schemas are licensed; this class implements the structural rules from the
 * specification and does not redistribute them.
 */
export class Document {
  private constructor(private readonly tree: Tree) {}

  static parse(xml: string): Document {
    if (XMLValidator.validate(xml) !== true) throw new Error('XML CDA tidak sah.');
    const tree = parser.parse(xml) as Tree;
    const root = Document.rootName(tree);
    if (root !== 'ClinicalDocument') {
      throw new Error(`Akar dokumen adalah ${root ?? '(kosong)'}, bukan ClinicalDocument.`);
    }
    return new Document(tree);
  }

  private static rootName(tree: Tree): string | null {
    for (const node of tree) {
      for (const key of Object.keys(node)) {
        if (key !== '?xml' && key !== ':@' && key !== '#text') return key;
      }
    }
    return null;
  }

  private static attrs(node: Node): Record<string, string> {
    return ((node[':@'] as Record<string, string>) ?? {}) as Record<string, string>;
  }

  private static children(nodes: Tree, name: string): Node[] {
    return nodes.filter((n) => Object.prototype.hasOwnProperty.call(n, name) && Array.isArray(n[name]));
  }

  /** `<structuredBody>` wraps each section in a `<component>`; this unwraps one level. */
  private static sectionsOf(nodes: Tree): Node[] {
    const out: Node[] = [];
    for (const comp of Document.children(nodes, 'component')) {
      out.push(...Document.children(Document.childArray(comp, 'component'), 'section'));
    }
    return out;
  }

  private static childArray(node: Node, name: string): Tree {
    const key = Object.keys(node).find((k) => k === name);
    return key === undefined ? [] : (node[key] as Tree);
  }

  /** Depth-first descendants with this tag name. */
  private static findAll(nodes: Tree, name: string): Node[] {
    const out: Node[] = [];
    for (const node of nodes) {
      for (const key of Object.keys(node)) {
        if (key === ':@' || key === '#text') continue;
        if (key === name) out.push(node);
        const kids = node[key];
        if (Array.isArray(kids)) out.push(...Document.findAll(kids as Tree, name));
      }
    }
    return out;
  }

  private static first(nodes: Tree, name: string): Node | null {
    return Document.findAll(nodes, name)[0] ?? null;
  }

  private static text(node: Node | null): string {
    if (!node) return '';
    const kids = Object.values(node).find(Array.isArray) as Tree | undefined;
    if (!kids) return '';
    return kids
      .filter((k) => Object.prototype.hasOwnProperty.call(k, '#text'))
      .map((k) => String(k['#text']))
      .join('')
      .trim();
  }

  private header(): Tree {
    const doc = Document.first(this.tree, 'ClinicalDocument');
    if (!doc) return [];
    return Document.childArray(doc, 'ClinicalDocument');
  }

  private attribute(name: string, attr: string): string {
    const node = Document.first(this.header(), name);
    return node ? Document.attrs(node)[attr] ?? '' : '';
  }

  title(): string {
    return Document.text(Document.first(this.header(), 'title'));
  }

  documentId(): string {
    const node = Document.first(this.header(), 'id');
    if (!node) return '';
    const a = Document.attrs(node);
    return a.root + (a.extension ? `|${a.extension}` : '');
  }

  typeCode(): string {
    return this.attribute('code', 'code');
  }

  effectiveTime(): string {
    return this.attribute('effectiveTime', 'value');
  }

  custodian(): string {
    const node = Document.first(this.header(), 'custodian');
    return node ? Document.text(Document.first(Document.childArray(node, 'custodian'), 'name')) : '';
  }

  /** Author names in document order; empty when the document is unsigned by a person. */
  authors(): string[] {
    const out: string[] = [];
    for (const author of Document.children(this.header(), 'author')) {
      const kids = Document.childArray(author, 'author');
      const family = Document.text(Document.first(kids, 'family'));
      const given = Document.text(Document.first(kids, 'given'));
      const name = `${given} ${family}`.trim();
      const software = Document.text(Document.first(kids, 'softwareName'));
      const value = name || software;
      if (value) out.push(value);
    }
    return out;
  }

  patient(): PatientRole {
    const role = Document.first(this.header(), 'patientRole');
    if (!role) return new PatientRole();
    const kids = Document.childArray(role, 'patientRole');
    const identifiers: { root: string; extension: string }[] = [];
    for (const id of Document.children(kids, 'id')) {
      const a = Document.attrs(id);
      identifiers.push({ root: a.root ?? '', extension: a.extension ?? '' });
    }
    const names: string[] = [];
    for (const name of Document.findAll(kids, 'name')) {
      const inner = Document.childArray(name, 'name');
      const value = `${Document.text(Document.first(inner, 'given'))} ${Document.text(Document.first(inner, 'family'))}`.trim();
      if (value) names.push(value);
    }
    const gender = Document.first(kids, 'administrativeGenderCode');
    const birth = Document.first(kids, 'birthTime');
    return new PatientRole(
      identifiers,
      names,
      gender ? Document.attrs(gender).code ?? '' : '',
      birth ? Document.attrs(birth).value ?? '' : '',
    );
  }

  sections(): Section[] {
    const body = Document.first(this.header(), 'structuredBody');
    if (!body) return [];
    return Document.sectionsOf(Document.childArray(body, 'structuredBody')).map((s) => this.readSection(s));
  }

  /** Section by LOINC code, searched through the whole tree. */
  section(loinc: string): Section | null {
    for (const section of this.sections()) {
      const hit = section.find(loinc);
      if (hit) return hit;
    }
    return null;
  }

  /** Narrative text of a section, with CDA markup flattened to text. */
  sectionText(loinc: string): string {
    const section = this.section(loinc);
    return section ? Document.plainText(section.text) : '';
  }

  private readSection(node: Node): Section {
    const kids = Document.childArray(node, 'section');
    const codes: Record<string, string> = {};
    for (const code of Document.children(kids, 'code')) {
      const a = Document.attrs(code);
      if (a.codeSystem && a.code) codes[a.codeSystem] = a.code;
    }
    const textNode = Document.first(kids, 'text');
    return new Section(
      Document.text(Document.first(kids, 'title')),
      textNode ? this.serialize(textNode) : '',
      codes,
      Document.sectionsOf(kids).map((child) => this.readSection(child)),
    );
  }

  private serialize(node: Node): string {
    return builder.build([node]).trim();
  }

  /** Flattens CDA narrative markup to plain text, keeping paragraph breaks. */
  static plainText(xml: string): string {
    if (!xml.trim()) return '';
    let nodes: Tree;
    try {
      nodes = parser.parse(xml) as Tree;
    } catch {
      return xml.trim();
    }
    const parts: string[] = [];
    const walk = (list: Tree): void => {
      for (const node of list) {
        for (const [key, value] of Object.entries(node)) {
          if (key === '#text') {
            // Indentation between elements is whitespace-only; CDA paragraph breaks come from the
            // element names below, so keeping it would sprinkle stray blank lines through the text.
            const text = String(value);
            if (text.trim() !== '') parts.push(text);
            continue;
          }
          if (key === ':@') continue;
          if (['paragraph', 'item', 'tr', 'caption'].includes(key)) parts.push('\n');
          if (Array.isArray(value)) walk(value as Tree);
        }
      }
    };
    walk(nodes);
    return parts.join('').replace(/\n{3,}/g, '\n\n').trim();
  }

  /**
   * Builds a minimal but structurally valid ClinicalDocument. Section text is passed as CDA
   * narrative markup (`<paragraph>…</paragraph>`), not escaped as text.
   */
  static build(data: {
    id?: string;
    title?: string;
    code?: string;
    codeDisplay?: string;
    effectiveTime?: string;
    custodian?: string;
    author?: string;
    patientId?: string;
    patientIdRoot?: string;
    patientName?: string;
    gender?: string;
    birthTime?: string;
    sections?: { loinc?: string; title?: string; text?: string }[];
  }): Document {
    const esc = (v: string): string =>
      v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
    const id = data.id ?? `DOC${new Date().toISOString().replace(/\D/g, '').slice(0, 14)}`;
    const now = data.effectiveTime ?? new Date().toISOString().replace(/\D/g, '').slice(0, 14);
    const root = data.patientIdRoot ?? '2.16.840.1.113883.3.3157.1003.1';
    const sections = (data.sections ?? [])
      .map((s) =>
        [
          '<component><section>',
          s.loinc ? `<code code="${esc(s.loinc)}" codeSystem="${LOINC}"/>` : '',
          `<title>${esc(s.title ?? '')}</title>`,
          `<text>${s.text ?? ''}</text>`,
          '</section></component>',
        ].join(''),
      )
      .join('');

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      `<ClinicalDocument xmlns="${CDA_NS}">`,
      '<realmCode code="ID"/>',
      '<typeId root="2.16.840.1.113883.1.3" extension="POCD_MT000040"/>',
      '<templateId root="2.16.840.1.113883.10.20.22.1.1"/>',
      `<id root="${esc(id)}"/>`,
      `<code code="${esc(data.code ?? '34133-9')}" codeSystem="${LOINC}" displayName="${esc(data.codeDisplay ?? 'Summarization of episode note')}"/>`,
      `<title>${esc(data.title ?? 'Catatan Medis')}</title>`,
      `<effectiveTime value="${esc(now)}"/>`,
      '<confidentialityCode code="N" codeSystem="2.16.840.1.113883.5.25"/>',
      '<recordTarget><patientRole>',
      data.patientId ? `<id root="${esc(root)}" extension="${esc(data.patientId)}"/>` : '',
      '<patient>',
      data.patientName ? `<name><family>${esc(data.patientName)}</family></name>` : '',
      data.gender ? `<administrativeGenderCode code="${esc(data.gender)}" codeSystem="2.16.840.1.113883.5.1"/>` : '',
      data.birthTime ? `<birthTime value="${esc(data.birthTime)}"/>` : '',
      '</patient></patientRole></recordTarget>',
      `<author><time value="${esc(now)}"/><assignedAuthor><id root="${esc(id)}.AUTH"/>`,
      `<assignedPerson><name><given>${esc(data.author ?? '')}</given></name></assignedPerson>`,
      '</assignedAuthor></author>',
      '<custodian><assignedCustodian><representedCustodianOrganization>',
      `<name>${esc(data.custodian ?? '')}</name>`,
      '</representedCustodianOrganization></assignedCustodian></custodian>',
      `<component><structuredBody>${sections}</structuredBody></component>`,
      '</ClinicalDocument>',
    ].join('');

    return Document.parse(xml);
  }

  /**
   * Structural check against the CDA R2 header rules that matter for exchange. An empty array means
   * the document is exchangeable, not that it is clinically correct.
   */
  validate(): string[] {
    const problems: string[] = [];
    if (!this.documentId()) problems.push('ClinicalDocument/id wajib ada.');
    if (!this.title()) problems.push('ClinicalDocument/title wajib ada.');
    if (!this.typeCode()) problems.push('ClinicalDocument/code wajib ada.');
    if (!this.effectiveTime()) problems.push('ClinicalDocument/effectiveTime wajib ada.');
    if (!Document.first(this.header(), 'recordTarget')) problems.push('recordTarget wajib ada.');
    if (this.patient().identifiers.length === 0) problems.push('recordTarget/patientRole/id wajib ada.');
    if (!this.custodian()) problems.push('custodian wajib ada.');
    if (this.authors().length === 0) problems.push('author wajib ada.');
    if (this.sections().length === 0) problems.push('structuredBody wajib berisi minimal satu section.');
    return problems;
  }

  /** The document as XML. Unknown structure parsed earlier is written back unchanged. */
  toXml(): string {
    const out = builder.build(this.tree).trim();
    return (out.startsWith('<?xml') ? out : '<?xml version="1.0" encoding="UTF-8"?>\n' + out) + '\n';
  }
}
