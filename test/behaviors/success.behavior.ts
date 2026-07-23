import { executeHttpRequest } from 'test/executors/http.executor.js';
import { HttpRequestOptionsType } from 'test/types/http-request-options-type.js';
import { requiredFieldType } from 'test/types/required-field-type.js';
import { RoleType } from 'test/types/role-type.js';
import { expect, it } from 'vitest';

export function shouldAcceptValidRequest(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
) {
  roles.forEach((role) => {
    it(`Should accept valid request (${role.type})`, async () => {
      const response = await executeHttpRequest(
        httpRequestOptions,
        role.getToken,
      );
      expect(response.status).toBeOneOf([200, 201]);
    });
  });
}
export function shouldAcceptUpdatingOneField(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
  fields: requiredFieldType[],
) {
  const updateFields = fields.filter((field) => !field.required);
  if (updateFields.length === 0) return;
  roles.forEach((role) => {
    fields.forEach((field) => {
      it(`Should accept updating one field (${field.name}) (${role.type})`, async () => {
        const body = httpRequestOptions.getBody();
        for (const updateField of updateFields) {
          if (updateField.name !== field.name) delete body[updateField.name];
        }
        httpRequestOptions.getBody = () => body;
        const response = await executeHttpRequest(
          httpRequestOptions,
          role.getToken,
        );
        expect(response.status).toBe(200);
      });
    });
  });
}
