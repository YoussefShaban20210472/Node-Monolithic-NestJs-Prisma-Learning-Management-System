import {
  shouldRejectInvalidDomain,
  shouldRejectInvalidType,
  shouldRejectMissingRequiredField,
  shouldRejectMissingRequiredFields,
  shouldRejectNullAndUndefined,
} from '../behaviors/validation.behavior.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { requiredFieldType } from '../types/required-field-type.js';
import { RoleType } from '../types/role-type.js';
import { describe } from 'vitest';

export function validationSuite(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
  fields: requiredFieldType[],
) {
  describe('Schema Validation', () => {
    shouldRejectMissingRequiredField(httpRequestOptions, roles, fields);
    shouldRejectMissingRequiredFields(httpRequestOptions, roles);
    shouldRejectInvalidType(httpRequestOptions, roles, fields);
    shouldRejectNullAndUndefined(httpRequestOptions, roles, fields);
  });
  describe('Domain Validation', () => {
    shouldRejectInvalidDomain(httpRequestOptions, roles, fields);
  });
}
