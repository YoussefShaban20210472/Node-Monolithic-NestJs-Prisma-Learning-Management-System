import { executeHttpRequest } from 'test/executors/http.executor.js';
import {
  expiredTokens,
  invalidTokens,
  malformedTokens,
} from 'test/invalid-values/auth/auth-invalid-values.js';
import { HttpRequestOptionsType } from 'test/types/http-request-options-type.js';
import { expect, it } from 'vitest';

export function shouldRejectMissingToken(
  httpRequestOptions: HttpRequestOptionsType,
) {
  it('Should reject missing token', async () => {
    const response = await executeHttpRequest(httpRequestOptions);
    expect(response.status).toBe(409);
  });
}

export function shouldRejectInvalidToken(
  httpRequestOptions: HttpRequestOptionsType,
) {
  invalidTokens.forEach((token) => {
    it(`Should reject invalid token (${token})`, async () => {
      const response = await executeHttpRequest(
        httpRequestOptions,
        () => token,
      );
      expect(response.status).toBe(409);
    });
  });
}
export function shouldRejectExpiredToken(
  httpRequestOptions: HttpRequestOptionsType,
) {
  expiredTokens.forEach((token) => {
    it(`Should reject expired token (${token})`, async () => {
      const response = await executeHttpRequest(
        httpRequestOptions,
        () => token,
      );
      expect(response.status).toBe(409);
    });
  });
}
export function shouldRejectMalformedToken(
  httpRequestOptions: HttpRequestOptionsType,
) {
  malformedTokens.forEach((token) => {
    it(`Should reject expired token (${token})`, async () => {
      const response = await executeHttpRequest(
        httpRequestOptions,
        () => token,
      );
      expect(response.status).toBe(409);
    });
  });
}
