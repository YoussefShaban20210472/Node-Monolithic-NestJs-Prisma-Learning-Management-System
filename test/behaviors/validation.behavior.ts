/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { executeHttpRequest } from '../executors/http.executor.js';
import { domainInvalidValues } from '../invalid-values/domain/domain-invalid-values.js';
import { typeInvalidValues } from '../invalid-values/type/type-invalid-values.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { requiredFieldType } from '../types/required-field-type.js';
import { RoleType } from '../types/role-type.js';
import { expect, it } from 'vitest';

export function shouldRejectMissingRequiredField(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
  fields: requiredFieldType[],
) {
  const requiredFields = fields.filter((field) => field.required);
  if (requiredFields.length === 0) return;
  roles.forEach((role) => {
    requiredFields.forEach((field) => {
      it(`Should reject missing required field (${field.name}) (${role.type})`, async () => {
        const body = httpRequestOptions.getBody();
        if (field.name in body) {
          delete body[field.name];
        }

        const response = await executeHttpRequest(
          { ...httpRequestOptions, getBody: () => body },
          role.getToken,
        );
        expect(response.status).toBe(400);
      });
    });
  });
}
export function shouldRejectMissingRequiredFields(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
) {
  roles.forEach((role) => {
    it(`Should reject missing required fields (${role.type})`, async () => {
      const response = await executeHttpRequest(
        { ...httpRequestOptions, getBody: () => ({}) },
        role.getToken,
      );
      expect(response.status).toBe(400);
    });
  });
}

export function shouldRejectInvalidType(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
  fields: requiredFieldType[],
) {
  roles.forEach((role) => {
    fields.forEach((field) => {
      let invalidTypeValues: any[];
      if (field.type && field.type in typeInvalidValues)
        invalidTypeValues = typeInvalidValues[field.type];
      else invalidTypeValues = typeInvalidValues.String;

      invalidTypeValues.forEach((value) => {
        it(`Should reject invalid type field:(${field.name}) value:(${value}) (${role.type})`, async () => {
          const body = httpRequestOptions.getBody();
          body[field.name] = value;

          const response = await executeHttpRequest(
            { ...httpRequestOptions, getBody: () => body },
            role.getToken,
          );
          expect(response.status).toBe(400);
        });
      });
    });
  });
}
export function shouldRejectNullAndUndefined(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
  fields: requiredFieldType[],
) {
  const requiredFields = fields.filter((field) => field.required);
  if (requiredFields.length === 0) return;
  roles.forEach((role) => {
    requiredFields.forEach((field) => {
      const invalidValues = [null, undefined];
      invalidValues.forEach((value) => {
        it(`Should reject ${value === null ? 'null' : 'undefined'} field:(${field.name}) value:(${value}) (${role.type})`, async () => {
          const body = httpRequestOptions.getBody();
          body[field.name] = value;

          const response = await executeHttpRequest(
            { ...httpRequestOptions, getBody: () => body },
            role.getToken,
          );
          expect(response.status).toBe(400);
        });
      });
    });
  });
}

export function shouldRejectInvalidDomain(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
  fields: requiredFieldType[],
) {
  roles.forEach((role) => {
    fields.forEach((field) => {
      let invalidDomainValues: any[] = [];
      if (field.domain in domainInvalidValues)
        invalidDomainValues = domainInvalidValues[field.domain];
      invalidDomainValues.forEach((value) => {
        it(`Should reject invalid domain field:(${field.name}) value:(${value}) (${role.type})`, async () => {
          const body = httpRequestOptions.getBody();
          body[field.name] = value;

          const response = await executeHttpRequest(
            { ...httpRequestOptions, getBody: () => body },
            role.getToken,
          );
          expect(response.status).toBe(400);
        });
      });
    });
  });
}
