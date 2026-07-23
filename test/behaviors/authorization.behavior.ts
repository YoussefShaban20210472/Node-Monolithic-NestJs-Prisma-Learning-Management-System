import { executeHttpRequest } from 'test/executors/http.executor.js';
import { HttpRequestOptionsType } from 'test/types/http-request-options-type.js';
import { RoleType } from 'test/types/role-type.js';
import { expect, it } from 'vitest';

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
      expect(response.status).toBe(409);
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
      expect(response.status).toBe(409);
    });
  });
}
