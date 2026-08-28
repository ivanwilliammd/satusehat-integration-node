export interface ErrorClassification {
  category: string;
  retryable: boolean;
  status: string;
  detail: string;
}

export function classifyError(httpCode: number): ErrorClassification {
  if (httpCode >= 200 && httpCode < 300) {
    return { category: 'success', retryable: false, status: 'success', detail: 'OK' };
  }
  if (httpCode === 401) {
    return { category: 'unauthorized', retryable: true, status: 'pending', detail: 'Unauthorized (401)' };
  }
  if (httpCode === 429 || (httpCode >= 500 && httpCode < 600)) {
    return { category: 'server_error', retryable: true, status: 'pending', detail: 'Retryable error' };
  }
  return { category: 'client_error', retryable: false, status: 'dlq', detail: 'DLQ / Client error' };
}
