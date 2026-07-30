import {
  shouldRejectInvalidDomain,
  shouldRejectInvalidType,
  shouldRejectMissingRequiredField,
  shouldRejectMissingRequiredFields,
  shouldRejectNullAndUndefined,
} from '../behaviors/validation.behavior.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { requiredFieldType } from '../types/required-field-type.js';
import { describe } from 'vitest';

export function validationSuite(
  httpRequestOptions: HttpRequestOptionsType,
  fields: requiredFieldType[],
) {
  describe('Schema Validation', () => {
    shouldRejectMissingRequiredField(httpRequestOptions, fields);
    shouldRejectMissingRequiredFields(httpRequestOptions);
    shouldRejectInvalidType(httpRequestOptions, fields);
    shouldRejectNullAndUndefined(httpRequestOptions, fields);
  });
  describe('Domain Validation', () => {
    shouldRejectInvalidDomain(httpRequestOptions, fields);
  });
}
