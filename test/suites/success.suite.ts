import { requiredFieldType } from 'test/types/required-field-type.js';
import {
  shouldAcceptUpdatingOneField,
  // shouldAcceptUpdatingOneField,
  shouldAcceptValidRequest,
} from '../behaviors/success.behavior.js';
import {
  HttpRequestOptionsType,
  // HttpRequestOptionsType,
} from '../types/http-request-options-type.js';
// import { requiredFieldType } from '../types/required-field-type.js';
import { describe } from 'vitest';

export function successSuite(
  httpRequestOptions: HttpRequestOptionsType[],
  fields?: requiredFieldType[],
) {
  describe('Success', () => {
    shouldAcceptValidRequest(httpRequestOptions);
    if (fields) shouldAcceptUpdatingOneField(httpRequestOptions, fields);
  });
}
