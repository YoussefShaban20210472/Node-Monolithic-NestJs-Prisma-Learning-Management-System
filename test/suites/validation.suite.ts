import {
  shouldRejectInvalidDomain,
  shouldRejectInvalidType,
  shouldRejectMissingRequiredField,
  shouldRejectMissingRequiredFields,
  shouldRejectNullAndUndefined,
} from 'test/behaviors/validation.behavior.js';
import { HttpRequestOptionsType } from 'test/types/http-request-options-type.js';
import { requiredFieldType } from 'test/types/required-field-type.js';
import { RoleType } from 'test/types/role-type.js';
import { describe } from 'vitest';

export function validationSuite(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
  fields?: requiredFieldType[],
) {
  if (fields === undefined) return;
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
