import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { requiredFieldType } from '../types/required-field-type.js';
import { RoleType } from '../types/role-type.js';
import { describe } from 'vitest';
import { validationSuite } from './validation.suite.js';
import { authorizationSuite } from './authorization.suite.js';
import { authenticationSuite } from './authentication.suite.js';
import { notFoundSuite } from './not-found.suite.js';

export function negativeSuite(
  httpRequestOptions: HttpRequestOptionsType,
  options: {
    forbiddenRolesForRole?: RoleType[];
    forbiddenRolesForAction?: RoleType[];
    fields?: requiredFieldType[];
    allowNotFound?: boolean;
  } = {},
) {
  describe('Negative', () => {
    authenticationSuite(httpRequestOptions);
    if (options.fields) validationSuite(httpRequestOptions, options.fields);
    if (options.allowNotFound)
      notFoundSuite(httpRequestOptions, options.fields);
    authorizationSuite(
      httpRequestOptions,
      options.forbiddenRolesForRole,
      options.forbiddenRolesForAction,
    );
  });
}
