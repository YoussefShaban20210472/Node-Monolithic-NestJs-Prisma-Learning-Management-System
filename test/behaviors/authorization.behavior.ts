import { executeHttpRequest } from '../executors/http.executor.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { RoleType } from '../types/role-type.js';
import { expect, it } from 'vitest';
const STATUS = 403;
export function shouldRejectForbiddenRole(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
) {
  roles.forEach((role) => {
    it(`Should reject unauthorized role (${role.type})`, async () => {
      const response = await executeHttpRequest(
        httpRequestOptions,
        role.getToken,
      );
      expect(response.status).toBe(STATUS);
    });
  });
}
export function shouldRejectForbiddenAction(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
) {
  roles.forEach((role) => {
    it(`Should reject unauthorized role (${role.type})`, async () => {
      const response = await executeHttpRequest(
        httpRequestOptions,
        role.getToken,
      );
      expect(response.status).toBe(STATUS);
    });
  });
}
