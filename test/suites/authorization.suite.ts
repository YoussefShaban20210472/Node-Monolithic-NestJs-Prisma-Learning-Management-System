import {
  shouldRejectForbiddenAction,
  shouldRejectForbiddenRole,
} from 'test/behaviors/authorization.behavior.js';
import { HttpRequestOptionsType } from 'test/types/http-request-options-type.js';
import { RoleType } from 'test/types/role-type.js';
import { describe } from 'vitest';

export function authorizationSuite(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
) {
  describe('Authorization', () => {
    shouldRejectForbiddenRole(httpRequestOptions, roles);
    shouldRejectForbiddenAction(httpRequestOptions, roles);
  });
}
