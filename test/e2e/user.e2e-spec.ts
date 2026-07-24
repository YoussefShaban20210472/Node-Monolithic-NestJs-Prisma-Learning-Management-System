import { describe } from 'node:test';
import { createRandomUser } from '../factories/user.factory.js';
import {
  adminLogin,
  adminUser,
  instructorLogin,
  studentLogin,
} from '../fixtures/user.fixture.js';
import { loginAndGetToken } from '../helpers/user.helper.js';
import { successSuite } from '../suites/success.suite.js';
import {
  HttpRequestOptionsForSuccessType,
  HttpRequestOptionsType,
} from '../types/http-request-options-type.js';
import { beforeAll } from 'vitest';
import { negativeSuite } from '../suites/negative.suite.js';
import { requiredUserFields } from '../schemas/user.schema.js';

let adminToken: string;
let instructorToken: string;
let studentToken: string;

beforeAll(async () => {
  adminToken = await loginAndGetToken(adminLogin);
  instructorToken = await loginAndGetToken(instructorLogin);
  studentToken = await loginAndGetToken(studentLogin);
});

await describe('Testing create user', () => {
  const method = 'POST';
  const getUrl = () => '/users';
  const httpRequestOptionsForSuccess: HttpRequestOptionsForSuccessType = {
    method,
    getUrl,
    getBodies: [
      {
        getBody: () => createRandomUser('ADMIN'),
        getDescribeString: (role: string) =>
          `should ${role} creates an admin user`,
      },
      {
        getBody: () => createRandomUser('INSTRUCTOR'),
        getDescribeString: (role: string) =>
          `should ${role} creates an instructor user `,
      },
      {
        getBody: () => createRandomUser('STUDENT'),
        getDescribeString: (role: string) =>
          `should ${role} creates a student user `,
      },
    ],
  };
  const httpRequestOptions: HttpRequestOptionsType = {
    method,
    getUrl,
    getBody: createRandomUser,
  };

  const roles = [{ type: 'ADMIN', getToken: () => `Bearer ${adminToken}` }];
  const unauthorizedRoles = [
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
    { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
  ];
  successSuite(httpRequestOptionsForSuccess, roles);
  negativeSuite(
    httpRequestOptions,
    roles,
    unauthorizedRoles,
    requiredUserFields,
  );
});
