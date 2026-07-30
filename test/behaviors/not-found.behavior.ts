import { executeHttpRequest } from '../executors/http.executor.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { requiredFieldType } from '../types/required-field-type.js';
import { expect, it } from 'vitest';

const idRegex = /^[0-9]+$/;
export function shouldRejectNotFoundIdInUrl(
  httpRequestOptions: HttpRequestOptionsType,
) {
  httpRequestOptions.roles!.forEach((role) => {
    it(`Should reject not found id (${role.type})`, async () => {
      let url = httpRequestOptions.getUrl();
      url = url
        .split('/')
        .map((part) => {
          if (idRegex.test(part)) return '999999999';
          return part;
        })
        .join('/');
      const response = await executeHttpRequest(
        { ...httpRequestOptions, getUrl: () => url },
        role.getToken,
      );
      expect(response.status).toBe(404);
    });
  });
}
export function shouldRejectNotFoundIdInBody(
  httpRequestOptions: HttpRequestOptionsType,
  fields: requiredFieldType[],
) {
  fields = fields.filter((field) => field.domain === 'ID');
  if (fields.length === 0) return;
  httpRequestOptions.roles!.forEach((role) => {
    fields.forEach((field) => {
      it(`Should reject not found id (${field.name}) (${role.type})`, async () => {
        const body = httpRequestOptions.getBody();
        body[field.name] = '999999999';
        const response = await executeHttpRequest(
          { ...httpRequestOptions, getBody: () => body },
          role.getToken,
        );
        expect(response.status).toBe(404);
      });
    });
  });
}
