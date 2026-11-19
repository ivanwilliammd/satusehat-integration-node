import { HL7Error, Message } from './message';

export type Severity = 'error' | 'warning';

export interface Issue {
  severity: Severity;
  path: string;
  message: string;
}

export interface ProfileDef {
  name: string;
  messageType?: string;
  trigger?: string;
  requiredSegments?: string[];
  requiredFields?: Record<string, string>;
  allowedValues?: Record<string, string[]>;
}

/**
 * A declarative validation profile: which segments must exist, which fields must be filled, and
 * which values are allowed.
 *
 * It is data, not a class per message type, because every LIS and every hospital disagrees about the
 * details. A new vendor is a new object, not a file ported to five languages.
 */
export class Profile {
  private constructor(private readonly def: ProfileDef) {}

  static from(def: ProfileDef): Profile {
    return new Profile(def);
  }

  validate(message: Message): Issue[] {
    const issues: Issue[] = [];
    const { messageType, trigger, requiredSegments = [], requiredFields = {}, allowedValues = {} } = this.def;

    if (messageType && message.messageType() !== messageType) {
      issues.push({ severity: 'error', path: 'MSH.9.1', message: `message type ${message.messageType()} is not ${messageType}` });
    }
    if (trigger && message.triggerEvent() !== trigger) {
      issues.push({ severity: 'error', path: 'MSH.9.2', message: `trigger ${message.triggerEvent()} is not ${trigger}` });
    }
    for (const segment of requiredSegments) {
      if (!message.segment(segment)) {
        issues.push({ severity: 'error', path: segment, message: 'required segment missing' });
      }
    }
    for (const [path, label] of Object.entries(requiredFields)) {
      if (message.get(path).trim() === '') {
        issues.push({ severity: 'error', path, message: `required (${label})` });
      }
    }
    for (const [path, allowed] of Object.entries(allowedValues)) {
      const value = message.get(path);
      if (value !== '' && !allowed.includes(value)) {
        issues.push({ severity: 'warning', path, message: `'${value}' is outside the usual set (${allowed.join(', ')})` });
      }
    }
    return issues;
  }

  /** True when no error-level issue is produced; warnings do not block. */
  passes(message: Message): boolean {
    return this.validate(message).every((i) => i.severity !== 'error');
  }
}

export function assertPasses(profile: Profile, message: Message): void {
  const errors = profile.validate(message).filter((i) => i.severity === 'error');
  if (errors.length) throw new HL7Error(errors.map((e) => `${e.path}: ${e.message}`).join('; '));
}
