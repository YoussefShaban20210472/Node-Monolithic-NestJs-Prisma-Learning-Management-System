import { executeHttpRequest } from 'test/executors/http.executor.js';
import { HttpRequestOptionsType } from 'test/types/http-request-options-type.js';
import { requiredFieldType } from 'test/types/required-field-type.js';
import { RoleType } from 'test/types/role-type.js';
import { expect, it } from 'vitest';

const idRegex = /^[0-9]+$/;
export function shouldRejectNotFoundIdInUrl(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
) {
  roles.forEach((role) => {
    it(`Should reject not found id (${role.type})`, async () => {
      let url = httpRequestOptions.getUrl();
      url = url
        .split('/')
        .map((part) => {
          if (idRegex.test(part)) return '999999999';
          return part;
        })
        .join('');
      httpRequestOptions.getUrl = () => url;
      const response = await executeHttpRequest(
        httpRequestOptions,
        role.getToken,
      );
      expect(response.status).toBe(404);
    });
  });
}
export function shouldRejectNotFoundIdInBody(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
  fields: requiredFieldType[],
) {
  fields = fields.filter((field) => field.domain === 'ID');
  if (fields.length === 0) return;
  roles.forEach((role) => {
    fields.forEach((field) => {
      it(`Should reject not found id (${field.name}) (${role.type})`, async () => {
        const body = httpRequestOptions.getBody();
        body[field.name] = '999999999';

        httpRequestOptions.getBody = () => body;
        const response = await executeHttpRequest(
          httpRequestOptions,
          role.getToken,
        );
        expect(response.status).toBe(404);
      });
    });
  });
}
