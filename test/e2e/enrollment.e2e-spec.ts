import { describe } from 'node:test';
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

import { createRandomCourseAndGetId } from '../helpers/course.helper.js';
import {
  requiredEnrollmentFields,
  updateEnrollmentFields,
} from '../schemas/enrollment.schema.js';
import {
  enrollStudent,
  enrollStudentById,
} from '../helpers/enrollment.helper.js';

let adminToken: string;
let instructorToken: string;
let studentToken: string;
let studentId: string;
let forbiddenInstructorToken: string;
let courseId: string;

beforeAll(async () => {
  adminToken = await loginAndGetToken(adminLogin);
  instructorToken = await loginAndGetToken(instructorLogin);
  studentToken = await loginAndGetToken(studentLogin);

  forbiddenInstructorToken = await createRandomUserAndLoginAndGetToken(
    'INSTRUCTOR',
    adminToken,
  );
  courseId = await createRandomCourseAndGetId(instructorToken);
  studentId = await createRandomUserAndGetId('STUDENT', adminToken);
});

const forbiddenRolesForAction = [
  {
    type: 'Forbidden Instructor',
    getToken: () => `Bearer ${forbiddenInstructorToken}`,
  },
];
await describe('Testing create enrollment by admin', () => {
  const method = 'POST';
  const getUrl = () => `/admin/courses/${courseId}/enrollments`;
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
        studentId: parseInt(studentId),
      }),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a new enrollment to a course`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    fields: requiredEnrollmentFields,
    allowNotFound: true,
  });
});

await describe('Testing create enrollment by student', () => {
  const method = 'POST';
  const getUrl = () => `/courses/${courseId}/enrollments`;
  const roles = [{ type: 'STUDENT', getToken: () => `Bearer ${studentToken}` }];
  const forbiddenRolesForRole = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({}),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a new enrollment to a course`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    allowNotFound: true,
  });
});

await describe('Testing get enrollment by admin and instructor', () => {
  let studentId: string;
  beforeAll(async () => {
    studentId = await createRandomUserAndGetId('STUDENT', adminToken);
    await enrollStudentById(studentId, courseId, adminToken);
  });
  const method = 'GET';
  const getUrl = () => `/courses/${courseId}/enrollments`;
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];
  const forbiddenRolesForRole = [
    { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({
        studentId: parseInt(studentId),
      }),
      roles,
      getDescribeString: (role: string) => `should ${role} gets an enrollment`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    fields: requiredEnrollmentFields,
    allowNotFound: true,
  });
});

await describe('Testing get enrollment by student', () => {
  let studentToken: string;
  beforeAll(async () => {
    studentToken = await createRandomUserAndLoginAndGetToken(
      'STUDENT',
      adminToken,
    );
    await enrollStudent(studentToken, courseId);
  });
  const method = 'GET';
  const getUrl = () => `/courses/${courseId}/enrollments/me`;
  const roles = [{ type: 'STUDENT', getToken: () => `Bearer ${studentToken}` }];
  const forbiddenRolesForRole = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({}),
      roles,
      getDescribeString: (role: string) => `should ${role} gets an enrollment`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    allowNotFound: true,
  });
});

await describe('Testing delete enrollment by admin', () => {
  let studentId: string;
  beforeAll(async () => {
    studentId = await createRandomUserAndGetId('STUDENT', adminToken);
    await enrollStudentById(studentId, courseId, adminToken);
  });
  const method = 'DELETE';
  const getUrl = () => `/admin/courses/${courseId}/enrollments`;
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
        studentId: parseInt(studentId),
      }),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} deletes an enrollment`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    fields: requiredEnrollmentFields,
    allowNotFound: true,
  });
});

await describe('Testing delete enrollment by student', () => {
  let studentToken: string;
  beforeAll(async () => {
    studentToken = await createRandomUserAndLoginAndGetToken(
      'STUDENT',
      adminToken,
    );
    await enrollStudent(studentToken, courseId);
  });
  const method = 'DELETE';
  const getUrl = () => `/courses/${courseId}/enrollments/me`;
  const roles = [{ type: 'STUDENT', getToken: () => `Bearer ${studentToken}` }];
  const forbiddenRolesForRole = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({}),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} deletes an enrollment`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    allowNotFound: true,
  });
});

await describe('Testing update enrollment by admin and instructor', () => {
  const studentsIds: string[] = [];
  beforeAll(async () => {
    for (let i = 0; i < 4; i++) {
      const studentId = await createRandomUserAndGetId('STUDENT', adminToken);
      await enrollStudentById(studentId, courseId, adminToken);
      studentsIds.push(studentId);
    }
  });
  const method = 'PATCH';
  const getUrl = () => `/courses/${courseId}/enrollments`;
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];
  const forbiddenRolesForRole = [
    { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
  ];
  const statuses = ['ACCEPTED', 'REJECTED'];
  const getHttpRequestOptions = () => {
    const httpRequestOptions: HttpRequestOptionsType[] = [];
    roles.forEach((role, roleIndex) => {
      statuses.forEach((status, statusIndex) => {
        httpRequestOptions.push({
          method,
          getUrl,
          getBody: () => ({
            studentId: parseInt(studentsIds[roleIndex * 2 + statusIndex]),
            status,
          }),
          roles: [role],
          getDescribeString: (role: string) =>
            `should ${role} update an enrollment (${status})`,
        });
      });
    });
    return httpRequestOptions;
  };
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({
        studentId: parseInt(studentId),
        status: 'ACCEPTED',
      }),
      roles,
      getDescribeString: (role: string) => `should ${role} gets an enrollment`,
    },
    ...getHttpRequestOptions(),
  ];
  successSuite(httpRequestOptions.slice(1));
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    fields: updateEnrollmentFields,
    allowNotFound: true,
  });
});
