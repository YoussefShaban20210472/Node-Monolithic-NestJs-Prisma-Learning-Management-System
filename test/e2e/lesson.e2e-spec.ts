import { describe } from 'node:test';
import {
  adminLogin,
  instructorLogin,
  studentLogin,
} from '../fixtures/user.fixture.js';
import {
  createRandomUserAndLoginAndGetToken,
  loginAndGetToken,
} from '../helpers/user.helper.js';
import { successSuite } from '../suites/success.suite.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { beforeAll } from 'vitest';
import { negativeSuite } from '../suites/negative.suite.js';

import { createRandomCourseAndGetId } from '../helpers/course.helper.js';

import { createRandomLesson } from '../factories/lesson.factory.js';
import {
  requiredLessonFields,
  updateLessonFields,
} from '../schemas/lesson.schema.js';
import { createRandomLessonAndGetId } from '../helpers/lesson.helper.js';
import { enrollStudent } from '../helpers/enrollment.helper.js';

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
  await enrollStudent(studentToken, courseId);
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
await describe('Testing create lesson', () => {
  const method = 'POST';
  const getUrl = () => `/courses/${courseId}/lessons`;
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => createRandomLesson(),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a new lesson to a course`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    fields: requiredLessonFields,
    allowNotFound: true,
  });
});

await describe('Testing get lesson', () => {
  let lessonId: string;
  beforeAll(async () => {
    lessonId = await createRandomLessonAndGetId(courseId, adminToken);
  });
  const method = 'GET';
  const getUrl = () => `/lessons/${lessonId}`;
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
      getDescribeString: (role: string) => `should ${role} gets a lesson`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForAction,
    allowNotFound: true,
  });
});

await describe('Testing get all lessons', () => {
  beforeAll(async () => {
    await createRandomLessonAndGetId(courseId, adminToken);
  });
  const method = 'GET';
  const getUrl = () => `/courses/${courseId}/lessons`;
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
      getDescribeString: (role: string) => `should ${role} gets all lessons`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForAction,
    allowNotFound: true,
  });
});

await describe('Testing delete lesson', () => {
  let lessonId1: string, lessonId2: string, lessonId3: string;
  beforeAll(async () => {
    lessonId1 = await createRandomLessonAndGetId(courseId, adminToken);
    lessonId2 = await createRandomLessonAndGetId(courseId, adminToken);
    lessonId3 = await createRandomLessonAndGetId(courseId, adminToken);
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
      getUrl: () => `/lessons/${lessonId1}`,
      getBody,
      roles: [roles[0]],
      getDescribeString: (role: string) => `should ${role} deletes a lesson`,
    },
    {
      method,
      getUrl: () => `/lessons/${lessonId2}`,
      getBody,
      roles: [roles[1]],
      getDescribeString: (role: string) => `should ${role} deletes a lesson`,
    },
    {
      method,
      getUrl: () => `/lessons/${lessonId3}`,
      getBody,
      roles,
      getDescribeString: (role: string) => `should ${role} deletes a lesson`,
    },
  ];
  successSuite(httpRequestOptions.slice(0, 2));
  negativeSuite(httpRequestOptions[2], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    allowNotFound: true,
  });
});

await describe('Testing update lesson', () => {
  let lessonId1: string, lessonId2: string, lessonId3: string;
  beforeAll(async () => {
    lessonId1 = await createRandomLessonAndGetId(courseId, adminToken);
    lessonId2 = await createRandomLessonAndGetId(courseId, adminToken);
    lessonId3 = await createRandomLessonAndGetId(courseId, adminToken);
  });
  const method = 'PATCH';
  const getBody = () => createRandomLesson();
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];

  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl: () => `/lessons/${lessonId1}`,
      getBody,
      roles: [roles[0]],
      getDescribeString: (role: string) => `should ${role} updates a lesson`,
    },
    {
      method,
      getUrl: () => `/lessons/${lessonId2}`,
      getBody,
      roles: [roles[1]],
      getDescribeString: (role: string) => `should ${role} updates a lesson`,
    },
    {
      method,
      getUrl: () => `/lessons/${lessonId3}`,
      getBody,
      roles,
      getDescribeString: (role: string) => `should ${role} updates a lesson`,
    },
  ];
  successSuite(httpRequestOptions.slice(0, 2));
  negativeSuite(httpRequestOptions[2], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    allowNotFound: true,
    fields: updateLessonFields,
  });
});
