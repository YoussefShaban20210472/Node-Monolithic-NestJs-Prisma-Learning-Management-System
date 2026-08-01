import { describe } from 'node:test';
import {
  adminLogin,
  instructorLogin,
  studentLogin,
} from '../fixtures/user.fixture.js';
import {
  createRandomUserAndLoginAndGetToken,
  getUserId,
  loginAndGetToken,
} from '../helpers/user.helper.js';
import { successSuite } from '../suites/success.suite.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { beforeAll } from 'vitest';
import { negativeSuite } from '../suites/negative.suite.js';

import { createRandomCourse } from '../factories/course.factory.js';
import {
  requiredCourseFields,
  updateCourseFields,
} from '../schemas/course.schema.js';
import { createRandomCourseAndGetId } from '../helpers/course.helper.js';

let adminToken: string;
let instructorToken: string;
let studentToken: string;
let instructorId: string;
let forbiddenInstructorToken: string;

beforeAll(async () => {
  adminToken = await loginAndGetToken(adminLogin);
  instructorToken = await loginAndGetToken(instructorLogin);
  studentToken = await loginAndGetToken(studentLogin);

  instructorId = await getUserId(instructorToken);
  forbiddenInstructorToken = await createRandomUserAndLoginAndGetToken(
    'INSTRUCTOR',
    adminToken,
  );
});

const forbiddenRolesForRole = [
  { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
];
const forbiddenRolesForAction = [
  {
    type: 'Forbidden Instructor',
    getToken: () => `Bearer ${forbiddenInstructorToken}`,
  },
];

await describe('Testing create course by admin', () => {
  const method = 'POST';
  const getUrl = () => '/admin/courses';
  const roles = [{ type: 'ADMIN', getToken: () => `Bearer ${adminToken}` }];
  const forbiddenRolesForRole = [
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
    { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({
        ...createRandomCourse(),
        instructorId: parseInt(instructorId),
      }),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a new course`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    fields: [
      ...requiredCourseFields,
      { name: 'instructorId', type: 'Number', domain: 'ID', required: true },
    ],
  });
});
await describe('Testing create course by instructor', () => {
  const method = 'POST';
  const getUrl = () => '/courses';
  const roles = [
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];
  const forbiddenRolesForRole = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => createRandomCourse(),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a new course`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    fields: requiredCourseFields,
  });
});

await describe('Testing delete course', () => {
  let courseId1: string, courseId2: string, courseId3: string;
  beforeAll(async () => {
    courseId1 = await createRandomCourseAndGetId(instructorToken);
    courseId2 = await createRandomCourseAndGetId(instructorToken);
    courseId3 = await createRandomCourseAndGetId(instructorToken);
  });
  const method = 'DELETE';
  const getBody = () => ({});
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];

  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl: () => `/courses/${courseId1}`,
      getBody,
      roles: [roles[0]],
      getDescribeString: (role: string) => `should ${role} deletes a course`,
    },
    {
      method,
      getUrl: () => `/courses/${courseId2}`,
      getBody,
      roles: [roles[1]],
      getDescribeString: (role: string) => `should ${role} deletes a course`,
    },
    {
      method,
      getUrl: () => `/courses/${courseId3}`,
      getBody,
      roles: roles,
      getDescribeString: (role: string) => `should ${role} deletes a course`,
    },
  ];
  successSuite(httpRequestOptions.slice(0, 2));
  negativeSuite(httpRequestOptions[2], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    allowNotFound: true,
  });
});

await describe('Testing get course', () => {
  let courseId: string;
  beforeAll(async () => {
    courseId = await createRandomCourseAndGetId(instructorToken);
  });
  const method = 'GET';
  const getBody = () => ({});
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
    { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl: () => `/courses/${courseId}`,
      getBody,
      roles: roles,
      getDescribeString: (role: string) => `should ${role} gets a course`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    allowNotFound: true,
    forbiddenRolesForAction,
  });
});
await describe('Testing get all courses', () => {
  const method = 'GET';
  const getBody = () => ({});
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
    { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl: () => `/courses`,
      getBody,
      roles: roles,
      getDescribeString: (role: string) => `should ${role} gets all courses`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0]);
});

await describe('Testing update course', () => {
  let courseId1: string, courseId2: string, courseId3: string;
  beforeAll(async () => {
    courseId1 = await createRandomCourseAndGetId(instructorToken);
    courseId2 = await createRandomCourseAndGetId(instructorToken);
    courseId3 = await createRandomCourseAndGetId(instructorToken);
  });
  const method = 'PATCH';
  const getBody = () => createRandomCourse();
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl: () => `/courses/${courseId1}`,
      getBody,
      roles: [roles[0]],
      getDescribeString: (role: string) => `should ${role} updates a course`,
    },
    {
      method,
      getUrl: () => `/courses/${courseId2}`,
      getBody,
      roles: [roles[1]],
      getDescribeString: (role: string) => `should ${role} updates a course`,
    },
    {
      method,
      getUrl: () => `/courses/${courseId3}`,
      getBody,
      roles: roles,
      getDescribeString: (role: string) => `should ${role} updates a course`,
    },
  ];
  successSuite(httpRequestOptions.slice(0, 2));
  negativeSuite(httpRequestOptions[2], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    allowNotFound: true,
    fields: updateCourseFields,
  });
});
