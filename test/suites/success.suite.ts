import {
  // shouldAcceptUpdatingOneField,
  shouldAcceptValidRequest,
} from '../behaviors/success.behavior.js';
import {
  HttpRequestOptionsForSuccessType,
  // HttpRequestOptionsType,
} from '../types/http-request-options-type.js';
// import { requiredFieldType } from '../types/required-field-type.js';
import { RoleType } from '../types/role-type.js';
import { describe } from 'vitest';

export function successSuite(
  httpRequestOptions: HttpRequestOptionsForSuccessType,
  roles: RoleType[],
  // fields?: requiredFieldType[],
) {
  describe('Success', () => {
    shouldAcceptValidRequest(httpRequestOptions, roles);
    // if (fields) shouldAcceptUpdatingOneField(httpRequestOptions, roles, fields);
  });
}
