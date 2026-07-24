import { executeHttpRequest } from '../executors/http.executor.js';
import {
  expiredTokens,
  invalidTokens,
  malformedTokens,
} from '../invalid-values/auth/auth-invalid-values.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { expect, it } from 'vitest';
const STATUS = 401;
export function shouldRejectMissingToken(
  httpRequestOptions: HttpRequestOptionsType,
) {
  it('Should reject missing token', async () => {
    const response = await executeHttpRequest(httpRequestOptions);
    expect(response.status).toBe(401);
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
      expect(response.status).toBe(STATUS);
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
      expect(response.status).toBe(STATUS);
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
      expect(response.status).toBe(STATUS);
    });
  });
}
