import {
  shouldRejectForbiddenAction,
  shouldRejectForbiddenRole,
} from '../behaviors/authorization.behavior.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { RoleType } from '../types/role-type.js';
import { describe } from 'vitest';

export function authorizationSuite(
  httpRequestOptions: HttpRequestOptionsType,
  forbiddenRolesForRole?: RoleType[],
  forbiddenRolesForAction?: RoleType[],
) {
  if (forbiddenRolesForAction || forbiddenRolesForRole)
    describe('Authorization', () => {
      if (forbiddenRolesForRole)
        shouldRejectForbiddenRole(httpRequestOptions, forbiddenRolesForRole);
      if (forbiddenRolesForAction)
        shouldRejectForbiddenAction(
          httpRequestOptions,
          forbiddenRolesForAction,
        );
    });
}
