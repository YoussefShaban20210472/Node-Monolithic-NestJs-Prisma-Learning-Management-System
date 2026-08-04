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

import {
  createRandomLessonAndGetId,
  getLessonOTPById,
} from '../helpers/lesson.helper.js';
import {
  enrollStudent,
  enrollStudentAndAccept,
} from '../helpers/enrollment.helper.js';
import {
  requiredAttendanceByAdminFields,
  requiredAttendanceByStudentFields,
  requiredGetAttendanceFields,
} from '../schemas/attendance.schema.js';
import { attendStudent } from '../helpers/attendance.helper.js';

let adminToken: string;
let instructorToken: string;
let studentToken: string;
let forbiddenInstructorToken: string;
let forbiddenStudentToken: string;
let courseId: string;
let lessonId: string;
let otp: string;

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
  lessonId = await createRandomLessonAndGetId(courseId, adminToken);
  otp = await getLessonOTPById(lessonId, adminToken);

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
await describe('Testing create attendance by admin', () => {
  let studentId: string;
  beforeAll(async () => {
    const studentToken = await createRandomUserAndLoginAndGetToken(
      'STUDENT',
      adminToken,
    );
    studentId = await getUserId(studentToken);
    await enrollStudent(studentToken, courseId);
    await enrollStudentAndAccept(studentId, courseId, adminToken);
  });
  const method = 'POST';
  const getUrl = () => `/admin/lessons/${lessonId}/attendances`;
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
        otp,
      }),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a new attendance to a lesson`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    fields: requiredAttendanceByAdminFields,
    allowNotFound: true,
  });
});

await describe('Testing create attendance by student', () => {
  let studentToken: string;
  beforeAll(async () => {
    studentToken = await createRandomUserAndLoginAndGetToken(
      'STUDENT',
      adminToken,
    );
    const studentId = await getUserId(studentToken);
    await enrollStudent(studentToken, courseId);
    await enrollStudentAndAccept(studentId, courseId, adminToken);
  });
  const method = 'POST';
  const getUrl = () => `/lessons/${lessonId}/attendances`;
  const roles = [{ type: 'STUDENT', getToken: () => `Bearer ${studentToken}` }];
  const forbiddenRolesForRole = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];
  const forbiddenRolesForAction = [
    {
      type: 'Forbidden Student',
      getToken: () => `Bearer ${forbiddenStudentToken}`,
    },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({ otp }),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a new attendance to a lesson`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    allowNotFound: true,
    fields: requiredAttendanceByStudentFields,
  });
});

await describe('Testing get attendance by admin and instructor', () => {
  let studentId: string;
  beforeAll(async () => {
    const studentToken = await createRandomUserAndLoginAndGetToken(
      'STUDENT',
      adminToken,
    );
    studentId = await getUserId(studentToken);
    await enrollStudent(studentToken, courseId);
    await enrollStudentAndAccept(studentId, courseId, adminToken);
    await attendStudent(studentId, lessonId, otp, adminToken);
  });
  const method = 'GET';
  const getUrl = () => `/lessons/${lessonId}/attendances`;
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
      getDescribeString: (role: string) => `should ${role} gets an attendance`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    fields: requiredGetAttendanceFields,
    allowNotFound: true,
  });
});

await describe('Testing get attendance by student', () => {
  let studentToken: string;
  beforeAll(async () => {
    studentToken = await createRandomUserAndLoginAndGetToken(
      'STUDENT',
      adminToken,
    );
    const studentId = await getUserId(studentToken);
    await enrollStudent(studentToken, courseId);
    await enrollStudentAndAccept(studentId, courseId, adminToken);
    await attendStudent(studentId, lessonId, otp, adminToken);
  });
  const method = 'GET';
  const getUrl = () => `/lessons/${lessonId}/attendances/me`;
  const roles = [{ type: 'STUDENT', getToken: () => `Bearer ${studentToken}` }];
  const forbiddenRolesForRole = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];
  const forbiddenRolesForAction = [
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
      getDescribeString: (role: string) => `should ${role} gets an attendance`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    allowNotFound: true,
  });
});

await describe('Testing get all lesson attendances', () => {
  let studentId: string;
  beforeAll(async () => {
    const studentToken = await createRandomUserAndLoginAndGetToken(
      'STUDENT',
      adminToken,
    );
    studentId = await getUserId(studentToken);
    await enrollStudent(studentToken, courseId);
    await enrollStudentAndAccept(studentId, courseId, adminToken);
    await attendStudent(studentId, lessonId, otp, adminToken);
  });
  const method = 'GET';
  const getUrl = () => `/lessons/${lessonId}/attendances/all`;
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
      getBody: () => ({}),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} gets all lesson attendances`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    allowNotFound: true,
  });
});
