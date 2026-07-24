import {
  shouldRejectNotFoundIdInBody,
  shouldRejectNotFoundIdInUrl,
} from '../behaviors/not-found.behavior.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { requiredFieldType } from '../types/required-field-type.js';
import { RoleType } from '../types/role-type.js';
import { describe } from 'vitest';

export function notFoundSuite(
  httpRequestOptions: HttpRequestOptionsType,
  roles: RoleType[],
  fields?: requiredFieldType[],
) {
  describe('Not Found', () => {
    shouldRejectNotFoundIdInUrl(httpRequestOptions, roles);
    if (fields) shouldRejectNotFoundIdInBody(httpRequestOptions, roles, fields);
  });
}
