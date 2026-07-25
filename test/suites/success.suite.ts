import { requiredFieldType } from 'test/types/required-field-type.js';
import {
  shouldAcceptUpdatingOneField,
  // shouldAcceptUpdatingOneField,
  shouldAcceptValidRequest,
} from '../behaviors/success.behavior.js';
import {
  HttpRequestOptionsType,
  // HttpRequestOptionsType,
} from '../types/http-request-options-type.js';
// import { requiredFieldType } from '../types/required-field-type.js';
import { RoleType } from '../types/role-type.js';
import { describe } from 'vitest';

export function successSuite(
  httpRequestOptions: HttpRequestOptionsType[],
  roles: RoleType[],
  fields?: requiredFieldType[],
) {
  describe('Success', () => {
    shouldAcceptValidRequest(httpRequestOptions, roles);
    if (fields) shouldAcceptUpdatingOneField(httpRequestOptions, roles, fields);
  });
}
