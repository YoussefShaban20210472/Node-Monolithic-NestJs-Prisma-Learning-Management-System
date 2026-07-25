import { executeHttpRequest } from '../executors/http.executor.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { requiredFieldType } from '../types/required-field-type.js';
import { RoleType } from '../types/role-type.js';
import { expect, it } from 'vitest';

export function shouldAcceptValidRequest(
  httpRequestOptions: HttpRequestOptionsType[],
  roles: RoleType[],
) {
  roles.forEach((role) => {
    httpRequestOptions.forEach((httpRequestOption) => {
      it(`${httpRequestOption.getDescribeString!(role.type.toLocaleLowerCase())}`, async () => {
        const response = await executeHttpRequest(
          httpRequestOption,
          role.getToken,
        );
        expect(response.status).toBeOneOf([200, 201]);
      });
    });
  });
}
export function shouldAcceptUpdatingOneField(
  httpRequestOptions: HttpRequestOptionsType[],
  roles: RoleType[],
  fields: requiredFieldType[],
) {
  const updateFields = fields.filter((field) => !field.required);
  if (updateFields.length === 0) return;
  roles.forEach((role) => {
    httpRequestOptions.forEach((httpRequestOption) => {
      fields.forEach((field) => {
        it(`should ${role.type.toLocaleLowerCase()} updates one field (${field.name})`, async () => {
          const body = httpRequestOption.getBody();
          for (const updateField of updateFields) {
            if (updateField.name !== field.name) delete body[updateField.name];
          }
          const response = await executeHttpRequest(
            { ...httpRequestOption, getBody: () => body },
            role.getToken,
          );
          expect(response.status).toBe(200);
        });
      });
    });
  });
}
