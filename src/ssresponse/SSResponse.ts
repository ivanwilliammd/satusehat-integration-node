/**
 * SSResponse — wraps HTTP status code, parsed JSON body, and raw content from SATUSEHAT FHIR API.
 */
export class SSResponse {
  private readonly httpCode: number;
  private readonly body: Record<string, any>;
  private readonly content: string;

  constructor(httpCode: number, body: Record<string, any> = {}, content: string = '') {
    this.httpCode = httpCode;
    this.body = body ?? {};
    this.content = content;
  }

  getHttpCode(): number {
    return this.httpCode;
  }

  getBody(): Record<string, any> {
    return this.body;
  }

  getContent(): string {
    return this.content;
  }

  isSuccess(): boolean {
    return this.httpCode >= 200 && this.httpCode < 300;
  }

  isError(): boolean {
    return !this.isSuccess();
  }

  /**
   * Extract FHIR OperationOutcome issue messages from response body.
   */
  getErrorMessages(): string[] {
    const messages: string[] = [];

    if (!this.body || this.body.resourceType !== 'OperationOutcome') {
      return messages;
    }

    if (!Array.isArray(this.body.issue)) {
      return messages;
    }

    for (const issue of this.body.issue) {
      const text =
        issue?.details?.text ??
        issue?.diagnostics ??
        issue?.details?.coding?.[0]?.display ??
        null;

      if (text) {
        messages.push(String(text));
      }
    }

    return messages;
  }

  /**
   * Extract resource id from response body.
   */
  getResourceId(): string | null {
    const id = this.body?.id ?? null;

    if (id) {
      return String(id);
    }

    // Bundle entry link (self link contains full URL with id)
    if (this.body?.resourceType === 'Bundle') {
      const selfLink = this.body?.link?.self?.url ?? null;
      if (selfLink) {
        const parts = String(selfLink).split('/');
        const lastPart = parts[parts.length - 1] ?? '';
        const idPart = lastPart.split('?')[0];
        if (idPart !== '') {
          return idPart;
        }
      }

      // first entry resource id
      const firstEntryId = this.body?.entry?.[0]?.resource?.id;
      if (firstEntryId) {
        return String(firstEntryId);
      }
    }

    // Patient create response
    if (this.body?.success === true) {
      return this.body?.data?.patient_id ?? null;
    }

    if (this.body?.create_patient?.success === true) {
      return this.body?.create_patient?.data?.patient_id ?? null;
    }

    return null;
  }

  /**
   * Shorthand for getResourceId — returns the id of the given FHIR resource type.
   */
  get(_resourceType: string): string | null {
    return this.getResourceId();
  }
}
