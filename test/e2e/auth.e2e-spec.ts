import { describe } from 'node:test';
import { createRandomUser } from '../factories/user.factory.js';
import { adminLogin } from '../fixtures/user.fixture.js';
import {
  createRandomUserAndLoginAndGetToken,
  createUserAndGetId,
  loginAndGetToken,
} from '../helpers/user.helper.js';
import { successSuite } from '../suites/success.suite.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { beforeAll } from 'vitest';
import { negativeSuite } from '../suites/negative.suite.js';

import { requiredAuthFields } from '../schemas/auth.schema.js';

let adminToken: string;
beforeAll(async () => {
  adminToken = await loginAndGetToken(adminLogin);
});
await describe('Testing login', () => {
  let adminAccount: object, instructorAccount: object, studentAccount: object;
  beforeAll(async () => {
    const admin = createRandomUser('ADMIN');
    const instructor = createRandomUser('INSTRUCTOR');
    const student = createRandomUser('STUDENT');
    await createUserAndGetId(admin, adminToken);
    await createUserAndGetId(instructor, adminToken);
    await createUserAndGetId(student, adminToken);
    adminAccount = { email: admin.email, password: admin.password };
    instructorAccount = {
      email: instructor.email,
      password: instructor.password,
    };
    studentAccount = { email: student.email, password: student.password };
  });
  const method = 'POST';
  const getUrl = () => '/auth/login';
  const roles = [{ type: 'Anonymous', getToken: () => '' }];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => adminAccount,
      roles,
      getDescribeString: (_: string) => `should admin logins`,
    },
    {
      method,
      getUrl,
      getBody: () => instructorAccount,
      roles,
      getDescribeString: (_: string) => `should instructor logins`,
    },
    {
      method,
      getUrl,
      getBody: () => studentAccount,
      roles,
      getDescribeString: (_: string) => `should student logins`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    fields: requiredAuthFields,
    allowAuthenication: false,
  });
});

await describe('Testing logout', () => {
  let localAdminToken: string,
    localInstructorToken: string,
    localStudentToken: string;
  beforeAll(async () => {
    localAdminToken = await createRandomUserAndLoginAndGetToken(
      'ADMIN',
      adminToken,
    );
    localInstructorToken = await createRandomUserAndLoginAndGetToken(
      'INSTRUCTOR',
      adminToken,
    );
    localStudentToken = await createRandomUserAndLoginAndGetToken(
      'STUDENT',
      adminToken,
    );
  });
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${localAdminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${localInstructorToken}` },
    { type: 'STUDENT', getToken: () => `Bearer ${localStudentToken}` },
  ];
  const method = 'POST';
  const getUrl = () => '/auth/logout';
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({}),
      roles,
      getDescribeString: (role: string) => `should ${role} logout`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0]);
});
