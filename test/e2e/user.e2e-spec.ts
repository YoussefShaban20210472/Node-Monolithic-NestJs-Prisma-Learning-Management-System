import { describe } from 'node:test';
import { createRandomUser } from '../factories/user.factory.js';
import {
  adminLogin,
  instructorLogin,
  studentLogin,
} from '../fixtures/user.fixture.js';
import {
  createRandomUserAndGetId,
  createRandomUserAndLoginAndGetToken,
  loginAndGetToken,
} from '../helpers/user.helper.js';
import { successSuite } from '../suites/success.suite.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { beforeAll } from 'vitest';
import { negativeSuite } from '../suites/negative.suite.js';
import {
  requiredUserFields,
  updateUserFields,
} from '../schemas/user.schema.js';

let adminToken: string;
let instructorToken: string;
let studentToken: string;
let studentId: string;
let adminId: string;
let instructorId: string;

beforeAll(async () => {
  adminToken = await loginAndGetToken(adminLogin);
  instructorToken = await loginAndGetToken(instructorLogin);
  studentToken = await loginAndGetToken(studentLogin);

  adminId = await createRandomUserAndGetId('ADMIN', adminToken);
  instructorId = await createRandomUserAndGetId('INSTRUCTOR', adminToken);
  studentId = await createRandomUserAndGetId('STUDENT', adminToken);
});
const roles = [{ type: 'ADMIN', getToken: () => `Bearer ${adminToken}` }];
const forbiddenRoles = [
  { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
];
await describe('Testing create user', () => {
  const method = 'POST';
  const getUrl = () => '/users';
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => createRandomUser('ADMIN'),
      getDescribeString: (role: string) =>
        `should ${role} creates an admin user`,
    },
    {
      method,
      getUrl,
      getBody: () => createRandomUser('INSTRUCTOR'),
      getDescribeString: (role: string) =>
        `should ${role} creates an instructor user`,
    },
    {
      method,
      getUrl,
      getBody: () => createRandomUser('STUDENT'),
      getDescribeString: (role: string) =>
        `should ${role} creates a student user`,
    },
  ];
  successSuite(httpRequestOptions, roles);
  negativeSuite(httpRequestOptions[0], roles, {
    forbiddenRolesForRole: forbiddenRoles,
    fields: requiredUserFields,
  });
});

await describe('Testing get user by id', () => {
  const method = 'GET';
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl: () => `/users/${adminId}`,
      getBody: () => ({}),
      getDescribeString: (role: string) => `should ${role} gets an admin user`,
    },
    {
      method,
      getUrl: () => `/users/${instructorId}`,
      getBody: () => ({}),
      getDescribeString: (role: string) =>
        `should ${role} gets an instructor user`,
    },
    {
      method,
      getUrl: () => `/users/${studentId}`,
      getBody: () => ({}),
      getDescribeString: (role: string) => `should ${role} gets a student user`,
    },
  ];
  successSuite(httpRequestOptions, roles);
  negativeSuite(httpRequestOptions[0], roles, {
    forbiddenRolesForRole: forbiddenRoles,
    allowNotFound: true,
  });
});

await describe('Testing delete user by id', () => {
  let studentId: string;
  let adminId: string;
  let instructorId: string;

  beforeAll(async () => {
    adminId = await createRandomUserAndGetId('ADMIN', adminToken);
    instructorId = await createRandomUserAndGetId('INSTRUCTOR', adminToken);
    studentId = await createRandomUserAndGetId('STUDENT', adminToken);
  });
  const method = 'DELETE';
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl: () => `/users/${adminId}`,
      getBody: () => ({}),
      getDescribeString: (role: string) =>
        `should ${role} deletes an admin user`,
    },
    {
      method,
      getUrl: () => `/users/${instructorId}`,
      getBody: () => ({}),
      getDescribeString: (role: string) =>
        `should ${role} deletes an instructor user`,
    },
    {
      method,
      getUrl: () => `/users/${studentId}`,
      getBody: () => ({}),
      getDescribeString: (role: string) =>
        `should ${role} deletes a student user`,
    },
  ];
  successSuite(httpRequestOptions, roles);
  negativeSuite(httpRequestOptions[0], roles, {
    forbiddenRolesForRole: forbiddenRoles,
    allowNotFound: true,
  });
});

await describe('Testing get all users', () => {
  const method = 'GET';
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl: () => `/users`,
      getBody: () => ({}),
      getDescribeString: (role: string) => `should ${role} gets all users`,
    },
  ];

  successSuite(httpRequestOptions, roles);
  negativeSuite(httpRequestOptions[0], roles, {
    forbiddenRolesForRole: forbiddenRoles,
  });
});

await describe('Testing get user by me', () => {
  const method = 'GET';
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl: () => `/users/me`,
      getBody: () => ({}),
      getDescribeString: (role: string) => `should ${role} gets his profile`,
    },
  ];
  const localRoles = [...roles, ...forbiddenRoles];
  successSuite(httpRequestOptions, localRoles);
  negativeSuite(httpRequestOptions[0], localRoles);
});

await describe('Testing update user by id', () => {
  let studentId: string;
  let adminId: string;
  let instructorId: string;

  beforeAll(async () => {
    adminId = await createRandomUserAndGetId('ADMIN', adminToken);
    instructorId = await createRandomUserAndGetId('INSTRUCTOR', adminToken);
    studentId = await createRandomUserAndGetId('STUDENT', adminToken);
  });
  const method = 'PATCH';
  const getBody = () => {
    const user = createRandomUser('ADMIN');
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
    };
  };
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl: () => `/users/${adminId}`,
      getBody: () => getBody(),
      getDescribeString: (role: string) =>
        `should ${role} updates an admin user`,
    },
    {
      method,
      getUrl: () => `/users/${instructorId}`,
      getBody: () => getBody(),
      getDescribeString: (role: string) =>
        `should ${role} updates an instructor user`,
    },
    {
      method,
      getUrl: () => `/users/${studentId}`,
      getBody: () => getBody(),
      getDescribeString: (role: string) =>
        `should ${role} updates a student user`,
    },
  ];
  successSuite(httpRequestOptions, roles, updateUserFields);
  negativeSuite(httpRequestOptions[0], roles, {
    forbiddenRolesForRole: forbiddenRoles,
    fields: updateUserFields,
    allowNotFound: true,
  });
});

await describe('Testing update user by me', () => {
  let localStudentToken: string;
  let localAdminToken: string;
  let localInstructorToken: string;

  beforeAll(async () => {
    localAdminToken = await createRandomUserAndLoginAndGetToken(
      'INSTRUCTOR',
      adminToken,
    );
    localInstructorToken = await createRandomUserAndLoginAndGetToken(
      'STUDENT',
      adminToken,
    );
    localStudentToken = await createRandomUserAndLoginAndGetToken(
      'ADMIN',
      adminToken,
    );
  });
  const method = 'PATCH';
  const getBody = () => {
    const user = createRandomUser('ADMIN');
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
    };
  };
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${localAdminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${localInstructorToken}` },
    { type: 'STUDENT', getToken: () => `Bearer ${localStudentToken}` },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl: () => `/users/me`,
      getBody: () => getBody(),
      getDescribeString: (role: string) => `should ${role} updates his profile`,
    },
  ];
  successSuite(httpRequestOptions, roles, updateUserFields);
  negativeSuite(httpRequestOptions[0], roles, {
    fields: updateUserFields,
  });
});
