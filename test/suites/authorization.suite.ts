import {
  shouldRejectForbiddenAction,
  shouldRejectForbiddenRole,
} from '../behaviors/authorization.behavior.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { RoleType } from '../types/role-type.js';
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
