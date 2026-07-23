import { HttpRequestOptionsType } from 'test/types/http-request-options-type.js';
import { requiredFieldType } from 'test/types/required-field-type.js';
import { RoleType } from 'test/types/role-type.js';
import { describe } from 'vitest';
import { validationSuite } from './validation.suite.js';
import { authorizationSuite } from './authorization.suite.js';
import { authenticationSuite } from './authentication.suite.js';
import { notFoundSuite } from './not-found.suite.js';

export function negativeSuite(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
  fields?: requiredFieldType[],
  allowNotFoundIdInUrl?: boolean,
) {
  describe('Negative', () => {
    authenticationSuite(httpRequestOptions);
    authorizationSuite(httpRequestOptions, roles);
    validationSuite(httpRequestOptions, roles, fields);
    notFoundSuite(httpRequestOptions, roles, fields, allowNotFoundIdInUrl);
  });
}
