import { executeHttpRequest } from '../executors/http.executor.js';
import {
  HttpRequestOptionsForSuccessType,
  HttpRequestOptionsType,
} from '../types/http-request-options-type.js';
import { requiredFieldType } from '../types/required-field-type.js';
import { RoleType } from '../types/role-type.js';
import { expect, it } from 'vitest';

export function shouldAcceptValidRequest(
  { method, getUrl, getBodies }: HttpRequestOptionsForSuccessType,
  roles: RoleType[],
) {
  roles.forEach((role) => {
    getBodies.forEach((body) => {
      it(`${body.getDescribeString(role.type.toLocaleLowerCase())}`, async () => {
        const response = await executeHttpRequest(
          { method, getUrl, getBody: body.getBody },
          role.getToken,
        );
        expect(response.status).toBeOneOf([200, 201]);
      });
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
