import {
  shouldRejectExpiredToken,
  shouldRejectInvalidToken,
  shouldRejectMalformedToken,
  shouldRejectMissingToken,
} from '../behaviors/authentication.behavior.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { describe } from 'vitest';

export function authenticationSuite(
  httpRequestOptions: HttpRequestOptionsType,
) {
  describe('Authentication', () => {
    shouldRejectMissingToken(httpRequestOptions);
    shouldRejectInvalidToken(httpRequestOptions);
    shouldRejectExpiredToken(httpRequestOptions);
    shouldRejectMalformedToken(httpRequestOptions);
  });
}
