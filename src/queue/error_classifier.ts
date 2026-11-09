import { STATUS_DLQ, STATUS_PENDING, STATUS_SUCCESS } from './queue_interface';

export interface ErrorClassification {
  category: string;
  retryable: boolean;
  status: string;
  detail: string;
}

/**
 * Classifies SATUSEHAT FHIR API HTTP responses into actionable categories.
 */
export class ErrorClassifier {
  public static readonly CAT_SUCCESS = 'success';
  public static readonly CAT_INVALID_REQUEST = 'invalid_request';
  public static readonly CAT_UNAUTHORIZED = 'unauthorized';
  public static readonly CAT_FORBIDDEN = 'forbidden';
  public static readonly CAT_NOT_FOUND = 'not_found';
  public static readonly CAT_CONFLICT = 'conflict';
  public static readonly CAT_VALIDATION_ERROR = 'validation_error';
  public static readonly CAT_RATE_LIMITED = 'rate_limited';
  public static readonly CAT_SERVER_ERROR = 'server_error';
  public static readonly CAT_NETWORK_ERROR = 'network_error';
  public static readonly CAT_UNEXPECTED = 'unexpected';

  public static classify(httpCode: number, responseBody: unknown = null): ErrorClassification {
    if (httpCode >= 200 && httpCode < 300) {
      return {
        category: ErrorClassifier.CAT_SUCCESS,
        retryable: false,
        status: STATUS_SUCCESS,
        detail: `HTTP ${httpCode}`,
      };
    }

    if (httpCode === 400) {
      return {
        category: ErrorClassifier.CAT_INVALID_REQUEST,
        retryable: false,
        status: STATUS_DLQ,
        detail: ErrorClassifier.extractDetail(responseBody) || 'Bad request (HTTP 400)',
      };
    }

    if (httpCode === 401) {
      return {
        category: ErrorClassifier.CAT_UNAUTHORIZED,
        retryable: true,
        status: STATUS_PENDING,
        detail: ErrorClassifier.extractDetail(responseBody) || 'Unauthorized (HTTP 401)',
      };
    }

    if (httpCode === 403) {
      return {
        category: ErrorClassifier.CAT_FORBIDDEN,
        retryable: false,
        status: STATUS_DLQ,
        detail: ErrorClassifier.extractDetail(responseBody) || 'Forbidden (HTTP 403)',
      };
    }

    if (httpCode === 404) {
      return {
        category: ErrorClassifier.CAT_NOT_FOUND,
        retryable: false,
        status: STATUS_DLQ,
        detail: ErrorClassifier.extractDetail(responseBody) || 'Resource not found (HTTP 404)',
      };
    }

    if (httpCode === 408) {
      return {
        category: ErrorClassifier.CAT_NETWORK_ERROR,
        retryable: true,
        status: STATUS_PENDING,
        detail: 'Request timeout (HTTP 408)',
      };
    }

    if (httpCode === 409) {
      return {
        category: ErrorClassifier.CAT_CONFLICT,
        retryable: false,
        status: STATUS_DLQ,
        detail: ErrorClassifier.extractDetail(responseBody) || 'Conflict (HTTP 409)',
      };
    }

    if (httpCode === 412) {
      return {
        category: ErrorClassifier.CAT_CONFLICT,
        retryable: false,
        status: STATUS_DLQ,
        detail: 'Precondition failed (HTTP 412) — resource changed',
      };
    }

    if (httpCode === 422) {
      return {
        category: ErrorClassifier.CAT_VALIDATION_ERROR,
        retryable: false,
        status: STATUS_DLQ,
        detail:
          ErrorClassifier.extractFhirIssues(responseBody) ||
          ErrorClassifier.extractDetail(responseBody) ||
          'Validation error (HTTP 422)',
      };
    }

    if (httpCode === 429) {
      return {
        category: ErrorClassifier.CAT_RATE_LIMITED,
        retryable: true,
        status: STATUS_PENDING,
        detail: 'Rate limited (HTTP 429)',
      };
    }

    if (httpCode >= 500 && httpCode < 600) {
      return {
        category: ErrorClassifier.CAT_SERVER_ERROR,
        retryable: true,
        status: STATUS_PENDING,
        detail: `Server error (HTTP ${httpCode})`,
      };
    }

    if (httpCode >= 400 && httpCode < 500) {
      return {
        category: ErrorClassifier.CAT_INVALID_REQUEST,
        retryable: false,
        status: STATUS_DLQ,
        detail: ErrorClassifier.extractDetail(responseBody) || `Client error (HTTP ${httpCode})`,
      };
    }

    return {
      category: ErrorClassifier.CAT_UNEXPECTED,
      retryable: false,
      status: STATUS_DLQ,
      detail: `Unexpected HTTP ${httpCode}`,
    };
  }

  private static extractDetail(body: unknown): string | null {
    if (body && typeof body === 'object' && !Array.isArray(body)) {
      const obj = body as Record<string, any>;
      if (obj.issue?.[0]?.diagnostics) {
        return String(obj.issue[0].diagnostics).slice(0, 200);
      }
      if (obj.issue?.[0]?.details?.text) {
        return String(obj.issue[0].details.text).slice(0, 200);
      }
      if (obj.message) {
        return String(obj.message).slice(0, 200);
      }
      if (obj.error_description) {
        return String(obj.error_description).slice(0, 200);
      }
    }
    if (typeof body === 'string' && body !== '') {
      try {
        const data = JSON.parse(body);
        if (data && typeof data === 'object') {
          return ErrorClassifier.extractDetail(data);
        }
      } catch {
        // Not JSON, return slice
      }
      return body.slice(0, 200);
    }
    return null;
  }

  private static extractFhirIssues(body: unknown): string | null {
    let parsed: Record<string, any> | null = null;
    if (typeof body === 'string' && body !== '') {
      try {
        parsed = JSON.parse(body);
      } catch {
        return null;
      }
    } else if (body && typeof body === 'object' && !Array.isArray(body)) {
      parsed = body as Record<string, any>;
    }

    if (!parsed || !Array.isArray(parsed.issue) || parsed.issue.length === 0) {
      return null;
    }

    const lines: string[] = [];
    for (const issue of parsed.issue.slice(0, 5)) {
      const msg = issue?.diagnostics ?? issue?.details?.text ?? issue?.location ?? 'Unknown';
      const sev = String(issue?.severity ?? 'ERROR').toUpperCase();
      lines.push(`[${sev}] ${String(msg).slice(0, 100)}`);
    }
    return lines.join(' | ');
  }
}

export function classifyError(httpCode: number, responseBody: unknown = null): ErrorClassification {
  return ErrorClassifier.classify(httpCode, responseBody);
}
