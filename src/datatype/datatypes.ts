// SATUSEHAT Integration DataTypes — TypeScript equivalents of PHP DataType classes
// Source: /home/openclaw/projects/satusehat-integration/src/DataType/

// ─── Base ─────────────────────────────────────────────────────────────────────

export interface DataType {
  toArray(): Record<string, any>;
}

function isPresent(v: any): boolean {
  return v !== null && v !== undefined && v !== '';
}

function filterPresent(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => isPresent(v) && !Array.isArray(v) || (Array.isArray(v) && v.length > 0))
  );
}

function nestedToArray(v: any): any {
  if (v === null || v === undefined) return v;
  if (typeof v === 'object' && 'toArray' in v && typeof (v as any).toArray === 'function') {
    return (v as any).toArray();
  }
  if (Array.isArray(v)) return v.map(nestedToArray);
  return v;
}

// ─── Identifier ───────────────────────────────────────────────────────────────

export class Identifier implements DataType {
  use?: string = undefined;
  type?: CodeableConcept = undefined;
  system?: string = undefined;
  value?: string = undefined;
  period?: Period = undefined;
  assigner?: Reference = undefined;

  constructor(
    system?: string,
    value?: string,
    use?: string,
    type?: CodeableConcept,
    period?: Period,
    assigner?: Reference
  ) {
    this.system = system;
    this.value = value;
    this.use = use;
    this.type = type;
    this.period = period;
    this.assigner = assigner;
  }

  toArray(): any {
    return filterPresent({
      use: this.use,
      type: nestedToArray(this.type),
      system: this.system,
      value: this.value,
      period: nestedToArray(this.period),
      assigner: nestedToArray(this.assigner),
    });
  }
}

// ─── HumanName ────────────────────────────────────────────────────────────────

export class HumanName implements DataType {
  use?: string = undefined;
  text?: string = undefined;
  family?: string = undefined;
  given: string[] = [];
  prefix: string[] = [];
  suffix: string[] = [];
  period?: Period = undefined;

  constructor(
    family?: string,
    given: string[] = [],
    use?: string,
    text?: string,
    prefix: string[] = [],
    suffix: string[] = [],
    period?: Period
  ) {
    this.family = family;
    this.given = given;
    this.use = use;
    this.text = text;
    this.prefix = prefix;
    this.suffix = suffix;
    this.period = period;
  }

  toArray(): any {
    return filterPresent({
      use: this.use,
      text: this.text,
      family: this.family,
      given: this.given.length ? this.given : undefined,
      prefix: this.prefix.length ? this.prefix : undefined,
      suffix: this.suffix.length ? this.suffix : undefined,
      period: nestedToArray(this.period),
    });
  }
}

// ─── Address ──────────────────────────────────────────────────────────────────

export class Address implements DataType {
  use?: string = undefined;
  type?: string = undefined;
  text?: string = undefined;
  line: string[] = [];
  city?: string = undefined;
  district?: string = undefined;
  state?: string = undefined;
  postalCode?: string = undefined;
  country?: string = undefined;
  period?: Period = undefined;

  constructor() {}

  toArray(): any {
    return filterPresent({
      use: this.use,
      type: this.type,
      text: this.text,
      line: this.line.length ? this.line : undefined,
      city: this.city,
      district: this.district,
      state: this.state,
      postalCode: this.postalCode,
      country: this.country,
      period: nestedToArray(this.period),
    });
  }
}

// ─── ContactPoint ─────────────────────────────────────────────────────────────

export class ContactPoint implements DataType {
  system?: string = undefined;
  value?: string = undefined;
  use?: string = undefined;
  rank?: number = undefined;
  period?: Period = undefined;

  constructor(
    system?: string,
    value?: string,
    use?: string,
    rank?: number,
    period?: Period
  ) {
    this.system = system;
    this.value = value;
    this.use = use;
    this.rank = rank;
    this.period = period;
  }

  toArray(): any {
    return filterPresent({
      system: this.system,
      value: this.value,
      use: this.use,
      rank: this.rank,
      period: nestedToArray(this.period),
    });
  }
}

// ─── Coding ───────────────────────────────────────────────────────────────────

export class Coding implements DataType {
  system?: string = undefined;
  version?: string = undefined;
  code?: string = undefined;
  display?: string = undefined;
  userSelected?: boolean = undefined;

  constructor(
    system?: string,
    code?: string,
    display?: string,
    version?: string,
    userSelected?: boolean
  ) {
    this.system = system;
    this.code = code;
    this.display = display;
    this.version = version;
    this.userSelected = userSelected;
  }

  toArray(): any {
    return filterPresent({
      system: this.system,
      version: this.version,
      code: this.code,
      display: this.display,
      userSelected: this.userSelected,
    });
  }
}

// ─── CodeableConcept ──────────────────────────────────────────────────────────

export class CodeableConcept implements DataType {
  coding: Coding[] = [];
  text?: string = undefined;

  constructor(text?: string) {
    this.text = text;
  }

  addCoding(coding: Coding): this {
    this.coding.push(coding);
    return this;
  }

  toArray(): any {
    return filterPresent({
      coding: this.coding.length ? this.coding.map(nestedToArray) : undefined,
      text: this.text,
    });
  }
}

// ─── Reference ────────────────────────────────────────────────────────────────

export class Reference implements DataType {
  reference?: string = undefined;
  type?: string = undefined;
  identifier?: Identifier = undefined;
  display?: string = undefined;

  constructor(reference?: string, display?: string) {
    this.reference = reference;
    this.display = display;
  }

  toArray(): any {
    return filterPresent({
      reference: this.reference,
      type: this.type,
      identifier: nestedToArray(this.identifier),
      display: this.display,
    });
  }
}

// ─── Period ───────────────────────────────────────────────────────────────────

export class Period implements DataType {
  start?: string = undefined;
  end?: string = undefined;

  constructor(start?: string, end?: string) {
    this.start = start;
    this.end = end;
  }

  toArray(): any {
    return filterPresent({ start: this.start, end: this.end });
  }
}

// ─── Quantity ─────────────────────────────────────────────────────────────────

export class Quantity implements DataType {
  value?: number = undefined;
  comparator?: string = undefined;
  unit?: string = undefined;
  system?: string = undefined;
  code?: string = undefined;

  constructor(
    value?: number,
    comparator?: string,
    unit?: string,
    system?: string,
    code?: string
  ) {
    this.value = value;
    this.comparator = comparator;
    this.unit = unit;
    this.system = system;
    this.code = code;
  }

  toArray(): any {
    return filterPresent({
      value: this.value,
      comparator: this.comparator,
      unit: this.unit,
      system: this.system,
      code: this.code,
    });
  }
}

// ─── Age ──────────────────────────────────────────────────────────────────────

export class Age extends Quantity {}

// ─── Distance ────────────────────────────────────────────────────────────────

export class Distance extends Quantity {}

// ─── Duration ─────────────────────────────────────────────────────────────────

export class Duration extends Quantity {}

// ─── Count ────────────────────────────────────────────────────────────────────

export class Count extends Quantity {}

// ─── SimpleQuantity ───────────────────────────────────────────────────────────

export class SimpleQuantity extends Quantity {
  constructor(
    value?: number,
    unit?: string,
    system?: string,
    code?: string
  ) {
    super(value, undefined, unit, system, code);
  }
}

// ─── Annotation ──────────────────────────────────────────────────────────────

export class Annotation implements DataType {
  author?: Reference | string = undefined;
  time?: string = undefined;
  text?: string = undefined;

  constructor(author?: Reference | string, text?: string, time?: string) {
    this.author = author;
    this.text = text;
    this.time = time;
  }

  toArray(): any {
    const authorVal = isPresent(this.author)
      ? (this.author instanceof Reference ? nestedToArray(this.author) : this.author)
      : undefined;
    return filterPresent({ author: authorVal, time: this.time, text: this.text });
  }
}

// ─── Attachment ───────────────────────────────────────────────────────────────

export class Attachment implements DataType {
  contentType?: string = undefined;
  language?: string = undefined;
  data?: string = undefined;
  url?: string = undefined;
  size?: number = undefined;
  hash?: string = undefined;
  title?: string = undefined;
  creation?: string = undefined;

  constructor(contentType?: string, data?: string, url?: string) {
    this.contentType = contentType;
    this.data = data;
    this.url = url;
  }

  toArray(): any {
    return filterPresent({
      contentType: this.contentType,
      language: this.language,
      data: this.data,
      url: this.url,
      size: this.size,
      hash: this.hash,
      title: this.title,
      creation: this.creation,
    });
  }
}

// ─── Money ───────────────────────────────────────────────────────────────────

export class Money implements DataType {
  value?: number = undefined;
  currency?: string = undefined;

  constructor(value?: number, currency?: string) {
    this.value = value;
    this.currency = currency;
  }

  toArray(): any {
    return filterPresent({ value: this.value, currency: this.currency });
  }
}

// ─── Narrative ────────────────────────────────────────────────────────────────

export class Narrative implements DataType {
  status?: string = undefined;
  div?: string = undefined;

  constructor(status?: string, div?: string) {
    this.status = status;
    this.div = div;
  }

  toArray(): any {
    return filterPresent({ status: this.status, div: this.div });
  }
}

// ─── Range ────────────────────────────────────────────────────────────────────

export class Range implements DataType {
  low?: Quantity = undefined;
  high?: Quantity = undefined;

  constructor(low?: Quantity, high?: Quantity) {
    this.low = low;
    this.high = high;
  }

  toArray(): any {
    return filterPresent({
      low: nestedToArray(this.low),
      high: nestedToArray(this.high),
    });
  }
}

// ─── Ratio ────────────────────────────────────────────────────────────────────

export class Ratio implements DataType {
  numerator?: Quantity = undefined;
  denominator?: Quantity = undefined;

  constructor(numerator?: Quantity, denominator?: Quantity) {
    this.numerator = numerator;
    this.denominator = denominator;
  }

  toArray(): any {
    return filterPresent({
      numerator: nestedToArray(this.numerator),
      denominator: nestedToArray(this.denominator),
    });
  }
}

// ─── Signature ────────────────────────────────────────────────────────────────

export class Signature implements DataType {
  type: Coding[] = [];
  when?: string = undefined;
  who?: Reference = undefined;
  onBehalfOf?: Reference = undefined;
  targetFormat?: string = undefined;
  sigFormat?: string = undefined;
  data?: string = undefined;

  addType(coding: Coding): this {
    this.type.push(coding);
    return this;
  }

  setWho(who: Reference): this {
    this.who = who;
    return this;
  }

  setOnBehalfOf(onBehalfOf: Reference): this {
    this.onBehalfOf = onBehalfOf;
    return this;
  }

  toArray(): any {
    return filterPresent({
      type: this.type.length ? this.type.map(nestedToArray) : undefined,
      when: this.when,
      who: nestedToArray(this.who),
      onBehalfOf: nestedToArray(this.onBehalfOf),
      targetFormat: this.targetFormat,
      sigFormat: this.sigFormat,
      data: this.data,
    });
  }
}

// ─── TimingRepeat ─────────────────────────────────────────────────────────────

export class TimingRepeat implements DataType {
  bounds?: Range | Period | Duration = undefined;
  count?: number = undefined;
  countMax?: number = undefined;
  duration?: number = undefined;
  durationMax?: number = undefined;
  durationUnit?: string = undefined;
  frequency?: number = undefined;
  frequencyMax?: number = undefined;
  period?: number = undefined;
  periodMax?: number = undefined;
  periodUnit?: string = undefined;
  dayOfWeek: string[] = [];
  timeOfDay: string[] = [];
  when: string[] = [];
  offset?: number = undefined;

  setBounds(bounds: Range | Period | Duration): this {
    this.bounds = bounds;
    return this;
  }

  addDayOfWeek(day: string): this {
    this.dayOfWeek.push(day);
    return this;
  }

  addTimeOfDay(time: string): this {
    this.timeOfDay.push(time);
    return this;
  }

  addWhen(when: string): this {
    this.when.push(when);
    return this;
  }

  toArray(): any {
    return filterPresent({
      bounds: nestedToArray(this.bounds),
      count: this.count,
      countMax: this.countMax,
      duration: this.duration,
      durationMax: this.durationMax,
      durationUnit: this.durationUnit,
      frequency: this.frequency,
      frequencyMax: this.frequencyMax,
      period: this.period,
      periodMax: this.periodMax,
      periodUnit: this.periodUnit,
      dayOfWeek: this.dayOfWeek.length ? this.dayOfWeek : undefined,
      timeOfDay: this.timeOfDay.length ? this.timeOfDay : undefined,
      when: this.when.length ? this.when : undefined,
      offset: this.offset,
    });
  }
}

// ─── Timing ───────────────────────────────────────────────────────────────────

export class Timing implements DataType {
  event: string[] = [];
  repeat?: TimingRepeat = undefined;
  code?: CodeableConcept = undefined;

  constructor() {}

  addEvent(event: string): this {
    this.event.push(event);
    return this;
  }

  setRepeat(repeat: TimingRepeat): this {
    this.repeat = repeat;
    return this;
  }

  setCode(code: CodeableConcept): this {
    this.code = code;
    return this;
  }

  toArray(): any {
    return filterPresent({
      event: this.event.length ? this.event : undefined,
      repeat: nestedToArray(this.repeat),
      code: nestedToArray(this.code),
    });
  }
}

// ─── DosageDoseAndRate ────────────────────────────────────────────────────────

export class DosageDoseAndRate implements DataType {
  type?: CodeableConcept = undefined;
  dose?: Range | SimpleQuantity = undefined;
  rate?: Range | Ratio | SimpleQuantity = undefined;

  setType(type: CodeableConcept): this {
    this.type = type;
    return this;
  }

  setDose(dose: Range | SimpleQuantity): this {
    this.dose = dose;
    return this;
  }

  setRate(rate: Range | Ratio | SimpleQuantity): this {
    this.rate = rate;
    return this;
  }

  toArray(): any {
    return filterPresent({
      type: nestedToArray(this.type),
      dose: nestedToArray(this.dose),
      rate: nestedToArray(this.rate),
    });
  }
}

// ─── Dosage ───────────────────────────────────────────────────────────────────

export class Dosage implements DataType {
  sequence?: number = undefined;
  text?: string = undefined;
  timing?: Timing = undefined;
  asNeeded?: boolean = undefined;
  site?: CodeableConcept = undefined;
  route?: CodeableConcept = undefined;
  method?: CodeableConcept = undefined;
  doseAndRate: DosageDoseAndRate[] = [];

  constructor() {}

  setSequence(sequence: number): this {
    this.sequence = sequence;
    return this;
  }

  setText(text: string): this {
    this.text = text;
    return this;
  }

  setTiming(timing: Timing): this {
    this.timing = timing;
    return this;
  }

  setAsNeeded(asNeeded: boolean): this {
    this.asNeeded = asNeeded;
    return this;
  }

  setSite(site: CodeableConcept): this {
    this.site = site;
    return this;
  }

  setRoute(route: CodeableConcept): this {
    this.route = route;
    return this;
  }

  setMethod(method: CodeableConcept): this {
    this.method = method;
    return this;
  }

  addDoseAndRate(doseAndRate: DosageDoseAndRate): this {
    this.doseAndRate.push(doseAndRate);
    return this;
  }

  toArray(): any {
    return filterPresent({
      sequence: this.sequence,
      text: this.text,
      timing: nestedToArray(this.timing),
      asNeeded: this.asNeeded,
      site: nestedToArray(this.site),
      route: nestedToArray(this.route),
      method: nestedToArray(this.method),
      doseAndRate: this.doseAndRate.length ? this.doseAndRate.map(nestedToArray) : undefined,
    });
  }
}

// ─── DataRequirement ───────────────────────────────────────────────────────────

export class DataRequirement implements DataType {
  type?: string = undefined;
  profile: string[] = [];
  subject?: CodeableConcept | Reference = undefined;
  codeFilter: Record<string, any>[] = [];
  dateFilter: Record<string, any>[] = [];
  sort: Record<string, any>[] = [];

  addProfile(profile: string): this {
    this.profile.push(profile);
    return this;
  }

  setSubject(subject: CodeableConcept | Reference): this {
    this.subject = subject;
    return this;
  }

  addCodeFilter(filter: Record<string, any>): this {
    this.codeFilter.push(filter);
    return this;
  }

  addDateFilter(filter: Record<string, any>): this {
    this.dateFilter.push(filter);
    return this;
  }

  addSort(sort: Record<string, any>): this {
    this.sort.push(sort);
    return this;
  }

  toArray(): any {
    return filterPresent({
      type: this.type,
      profile: this.profile.length ? this.profile : undefined,
      subject: nestedToArray(this.subject),
      codeFilter: this.codeFilter.length ? this.codeFilter : undefined,
      dateFilter: this.dateFilter.length ? this.dateFilter : undefined,
      sort: this.sort.length ? this.sort : undefined,
    });
  }
}

// ─── Expression ───────────────────────────────────────────────────────────────

export class Expression implements DataType {
  description?: string = undefined;
  language?: string = undefined;
  expression?: string = undefined;
  reference?: string = undefined;

  constructor(language?: string, expression?: string, description?: string) {
    this.language = language;
    this.expression = expression;
    this.description = description;
  }

  toArray(): any {
    return filterPresent({
      description: this.description,
      language: this.language,
      expression: this.expression,
      reference: this.reference,
    });
  }
}

// ─── Extension ────────────────────────────────────────────────────────────────

export class Extension implements DataType {
  url?: string = undefined;
  value: any = undefined;

  constructor(url: string, value?: any) {
    this.url = url;
    this.value = value;
  }

  setValue(value: any): this {
    this.value = value;
    return this;
  }

  toArray(): any {
    return filterPresent({ url: this.url, value: this.value });
  }
}

// ─── ParameterDefinition ───────────────────────────────────────────────────────

export class ParameterDefinition implements DataType {
  name?: string = undefined;
  use?: string = undefined;
  min?: number = undefined;
  max?: string = undefined;
  documentation?: string = undefined;
  type?: string = undefined;
  profile?: string = undefined;

  constructor(
    name?: string,
    use?: string,
    min?: number,
    max?: string
  ) {
    this.name = name;
    this.use = use;
    this.min = min;
    this.max = max;
  }

  toArray(): any {
    return filterPresent({
      name: this.name,
      use: this.use,
      min: this.min,
      max: this.max,
      documentation: this.documentation,
      type: this.type,
      profile: this.profile,
    });
  }
}

// ─── RelatedArtifact ───────────────────────────────────────────────────────────

export class RelatedArtifact implements DataType {
  type?: string = undefined;
  label?: string = undefined;
  display?: string = undefined;
  citation?: string = undefined;
  url?: string = undefined;
  document?: Attachment = undefined;
  resource?: string = undefined;

  constructor(type?: string, display?: string) {
    this.type = type;
    this.display = display;
  }

  setDocument(document: Attachment): this {
    this.document = document;
    return this;
  }

  toArray(): any {
    return filterPresent({
      type: this.type,
      label: this.label,
      display: this.display,
      citation: this.citation,
      url: this.url,
      document: nestedToArray(this.document),
      resource: this.resource,
    });
  }
}

// ─── TriggerDefinition ─────────────────────────────────────────────────────────

export class TriggerDefinition implements DataType {
  type?: string = undefined;
  eventName?: string = undefined;
  eventTiming?: Timing | Period | string = undefined;
  eventData?: DataRequirement = undefined;

  constructor(type?: string) {
    this.type = type;
  }

  setEventTiming(eventTiming: Timing | Period | string): this {
    this.eventTiming = eventTiming;
    return this;
  }

  setEventData(eventData: DataRequirement): this {
    this.eventData = eventData;
    return this;
  }

  toArray(): any {
    return filterPresent({
      type: this.type,
      eventName: this.eventName,
      eventTiming: nestedToArray(this.eventTiming),
      eventData: nestedToArray(this.eventData),
    });
  }
}
