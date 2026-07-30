import {
  shouldRejectNotFoundIdInBody,
  shouldRejectNotFoundIdInUrl,
} from '../behaviors/not-found.behavior.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { requiredFieldType } from '../types/required-field-type.js';
import { describe } from 'vitest';

export function notFoundSuite(
  httpRequestOptions: HttpRequestOptionsType,
  fields?: requiredFieldType[],
) {
  describe('Not Found', () => {
    shouldRejectNotFoundIdInUrl(httpRequestOptions);
    if (fields) shouldRejectNotFoundIdInBody(httpRequestOptions, fields);
  });
}
