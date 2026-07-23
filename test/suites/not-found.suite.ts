import {
  shouldRejectNotFoundIdInBody,
  shouldRejectNotFoundIdInUrl,
} from 'test/behaviors/not-found.behavior.js';
import { HttpRequestOptionsType } from 'test/types/http-request-options-type.js';
import { requiredFieldType } from 'test/types/required-field-type.js';
import { RoleType } from 'test/types/role-type.js';
import { describe } from 'vitest';

export function notFoundSuite(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
  fields?: requiredFieldType[],
  allowNotFoundIdInUrl?: boolean,
) {
  if (allowNotFoundIdInUrl === undefined) allowNotFoundIdInUrl = true;
  if (fields || allowNotFoundIdInUrl)
    describe('Not Found', () => {
      if (allowNotFoundIdInUrl)
        shouldRejectNotFoundIdInUrl(httpRequestOptions, roles);
      if (fields)
        shouldRejectNotFoundIdInBody(httpRequestOptions, roles, fields);
    });
}
