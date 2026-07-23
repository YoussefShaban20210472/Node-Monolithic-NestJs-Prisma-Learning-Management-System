import {
  shouldAcceptUpdatingOneField,
  shouldAcceptValidRequest,
} from 'test/behaviors/success.behavior.js';
import { HttpRequestOptionsType } from 'test/types/http-request-options-type.js';
import { requiredFieldType } from 'test/types/required-field-type.js';
import { RoleType } from 'test/types/role-type.js';
import { describe } from 'vitest';

export function successSuite(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
  fields?: requiredFieldType[],
) {
  describe('Success', () => {
    shouldAcceptValidRequest(httpRequestOptions, roles);
    if (fields) shouldAcceptUpdatingOneField(httpRequestOptions, roles, fields);
  });
}
