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

import { createRandomCourseAndGetId } from '../helpers/course.helper.js';

import { createRandomAssignment } from '../factories/assignment.factory.js';
import {
  requiredAssignmentFields,
  updateAssignmentFields,
} from '../schemas/assignment.schema.js';
import { createRandomAssignmentAndGetId } from '../helpers/assignment.helper.js';
import {
  enrollStudent,
  enrollStudentAndAccept,
} from '../helpers/enrollment.helper.js';

let adminToken: string;
let instructorToken: string;
let studentToken: string;
let forbiddenInstructorToken: string;
let forbiddenStudentToken: string;
let courseId: string;

beforeAll(async () => {
  adminToken = await loginAndGetToken(adminLogin);
  instructorToken = await loginAndGetToken(instructorLogin);
  studentToken = await loginAndGetToken(studentLogin);

  forbiddenInstructorToken = await createRandomUserAndLoginAndGetToken(
    'INSTRUCTOR',
    adminToken,
  );
  forbiddenStudentToken = await createRandomUserAndLoginAndGetToken(
    'STUDENT',
    adminToken,
  );
  courseId = await createRandomCourseAndGetId(instructorToken);
  const studentId = await getUserId(studentToken);
  await enrollStudent(studentToken, courseId);
  await enrollStudentAndAccept(studentId, courseId, adminToken);
});

const forbiddenRolesForAction = [
  {
    type: 'Forbidden Instructor',
    getToken: () => `Bearer ${forbiddenInstructorToken}`,
  },
];
const forbiddenRolesForRole = [
  { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
];
await describe('Testing create assignment', () => {
  const method = 'POST';
  const getUrl = () => `/courses/${courseId}/assignments`;
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => createRandomAssignment(),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a new assignment to a course`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    fields: requiredAssignmentFields,
    allowNotFound: true,
  });
});

await describe('Testing get assignment', () => {
  let assignmentId: string;
  beforeAll(async () => {
    assignmentId = await createRandomAssignmentAndGetId(courseId, adminToken);
  });
  const method = 'GET';
  const getUrl = () => `/assignments/${assignmentId}`;
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
    { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
  ];
  const forbiddenRolesForAction = [
    {
      type: 'Forbidden Instructor',
      getToken: () => `Bearer ${forbiddenInstructorToken}`,
    },
    {
      type: 'Forbidden Student',
      getToken: () => `Bearer ${forbiddenStudentToken}`,
    },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({}),
      roles,
      getDescribeString: (role: string) => `should ${role} gets a assignment`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForAction,
    allowNotFound: true,
  });
});

await describe('Testing get all assignments', () => {
  beforeAll(async () => {
    await createRandomAssignmentAndGetId(courseId, adminToken);
  });
  const method = 'GET';
  const getUrl = () => `/courses/${courseId}/assignments`;
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
    { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
  ];
  const forbiddenRolesForAction = [
    {
      type: 'Forbidden Instructor',
      getToken: () => `Bearer ${forbiddenInstructorToken}`,
    },
    {
      type: 'Forbidden Student',
      getToken: () => `Bearer ${forbiddenStudentToken}`,
    },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({}),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} gets all assignments`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForAction,
    allowNotFound: true,
  });
});

await describe('Testing delete assignment', () => {
  let assignmentId1: string, assignmentId2: string, assignmentId3: string;
  beforeAll(async () => {
    assignmentId1 = await createRandomAssignmentAndGetId(courseId, adminToken);
    assignmentId2 = await createRandomAssignmentAndGetId(courseId, adminToken);
    assignmentId3 = await createRandomAssignmentAndGetId(courseId, adminToken);
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
      getUrl: () => `/assignments/${assignmentId1}`,
      getBody,
      roles: [roles[0]],
      getDescribeString: (role: string) =>
        `should ${role} deletes a assignment`,
    },
    {
      method,
      getUrl: () => `/assignments/${assignmentId2}`,
      getBody,
      roles: [roles[1]],
      getDescribeString: (role: string) =>
        `should ${role} deletes a assignment`,
    },
    {
      method,
      getUrl: () => `/assignments/${assignmentId3}`,
      getBody,
      roles,
      getDescribeString: (role: string) =>
        `should ${role} deletes a assignment`,
    },
  ];
  successSuite(httpRequestOptions.slice(0, 2));
  negativeSuite(httpRequestOptions[2], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    allowNotFound: true,
  });
});

await describe('Testing update assignment', () => {
  let assignmentId1: string, assignmentId2: string, assignmentId3: string;
  beforeAll(async () => {
    assignmentId1 = await createRandomAssignmentAndGetId(courseId, adminToken);
    assignmentId2 = await createRandomAssignmentAndGetId(courseId, adminToken);
    assignmentId3 = await createRandomAssignmentAndGetId(courseId, adminToken);
  });
  const method = 'PATCH';
  const getBody = () => createRandomAssignment();
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];

  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl: () => `/assignments/${assignmentId1}`,
      getBody,
      roles: [roles[0]],
      getDescribeString: (role: string) =>
        `should ${role} updates a assignment`,
    },
    {
      method,
      getUrl: () => `/assignments/${assignmentId2}`,
      getBody,
      roles: [roles[1]],
      getDescribeString: (role: string) =>
        `should ${role} updates a assignment`,
    },
    {
      method,
      getUrl: () => `/assignments/${assignmentId3}`,
      getBody,
      roles,
      getDescribeString: (role: string) =>
        `should ${role} updates a assignment`,
    },
  ];
  successSuite(httpRequestOptions.slice(0, 2));
  negativeSuite(httpRequestOptions[2], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    allowNotFound: true,
    fields: updateAssignmentFields,
  });
});
