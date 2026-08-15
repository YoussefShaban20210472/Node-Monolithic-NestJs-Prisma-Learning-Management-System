import { describe } from 'node:test';
import {
  adminLogin,
  instructorLogin,
  studentLogin,
} from '../fixtures/user.fixture.js';
import {
  createRandomUserAndGetId,
  createRandomUserAndLoginAndGetToken,
  getUserId,
  loginAndGetToken,
} from '../helpers/user.helper.js';
import { successSuite } from '../suites/success.suite.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { beforeAll } from 'vitest';
import { negativeSuite } from '../suites/negative.suite.js';

import { createRandomCourseAndGetId } from '../helpers/course.helper.js';

import { createRandomAssignmentAndGetId } from '../helpers/assignment.helper.js';
import { enrollStudentAndAccept } from '../helpers/enrollment.helper.js';
import {
  requiredScoreSubmissionFields,
  requiredSubmissionFields,
} from '../schemas/submission.schema.js';
import { createSubmissionAndGetId } from '../helpers/submission.helper.js';

let adminToken: string;
let instructorToken: string;
let studentToken: string;
let forbiddenInstructorToken: string;
let forbiddenStudentToken: string;
let courseId: string;
let assignmentId: string;

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
  assignmentId = await createRandomAssignmentAndGetId(courseId, adminToken);

  const studentId = await getUserId(studentToken);

  await enrollStudentAndAccept(studentId, courseId, adminToken);
});

await describe('Testing create submission by admin', () => {
  let studentId: string;
  beforeAll(async () => {
    const studentToken = await createRandomUserAndLoginAndGetToken(
      'STUDENT',
      adminToken,
    );
    studentId = await getUserId(studentToken);

    await enrollStudentAndAccept(studentId, courseId, adminToken);
  });
  const method = 'POST';
  const getUrl = () => `/admin/assignments/${assignmentId}/submissions`;
  const roles = [{ type: 'ADMIN', getToken: () => `Bearer ${adminToken}` }];
  const forbiddenRolesForRole = [
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
    { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({ studentId: parseInt(studentId) }),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a new submission to an assignment`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    fields: requiredSubmissionFields,
    allowNotFound: true,
  });
});
await describe('Testing create submission by student', () => {
  const method = 'POST';
  const getUrl = () => `/assignments/${assignmentId}/submissions`;
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
      getDescribeString: (role: string) =>
        `should ${role} creates a new submission to an assignment`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    allowNotFound: true,
  });
});

await describe('Testing get submission', () => {
  let studentToken: string;
  let submissionId: string;
  beforeAll(async () => {
    studentToken = await createRandomUserAndLoginAndGetToken(
      'STUDENT',
      adminToken,
    );
    const studentId = await getUserId(studentToken);

    await enrollStudentAndAccept(studentId, courseId, adminToken);
    submissionId = await createSubmissionAndGetId(
      assignmentId,
      studentId,
      adminToken,
    );
  });
  const method = 'GET';
  const getUrl = () => `/submissions/${submissionId}`;
  const roles = [
    { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];
  const forbiddenRolesForAction = [
    {
      type: 'Forbidden Student',
      getToken: () => `Bearer ${forbiddenStudentToken}`,
    },
    {
      type: 'Forbidden Instructor',
      getToken: () => `Bearer ${forbiddenInstructorToken}`,
    },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({}),
      roles,
      getDescribeString: (role: string) => `should ${role} gets a submission`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForAction,
    allowNotFound: true,
  });
});

await describe('Testing delete submission', () => {
  let studentToken: string;
  const submissionIds: string[] = [];
  beforeAll(async () => {
    for (let i = 0; i < 3; i++) {
      studentToken = await createRandomUserAndLoginAndGetToken(
        'STUDENT',
        adminToken,
      );
      const studentId = await getUserId(studentToken);
      await enrollStudentAndAccept(studentId, courseId, adminToken);
      const submissionId = await createSubmissionAndGetId(
        assignmentId,
        studentId,
        adminToken,
      );
      submissionIds.push(submissionId);
    }
  });
  const method = 'DELETE';
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
  ];
  const forbiddenRolesForRole = [
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
      getUrl: () => `/submissions/${submissionIds[0]}`,
      getBody: () => ({}),
      roles: [roles[0]],
      getDescribeString: (role: string) =>
        `should ${role} deletes a submission`,
    },
    {
      method,
      getUrl: () => `/submissions/${submissionIds[2]}`,
      getBody: () => ({}),
      roles: [roles[1]],
      getDescribeString: (role: string) =>
        `should ${role} deletes a submission`,
    },
    {
      method,
      getUrl: () => `/submissions/${submissionIds[1]}`,
      getBody: () => ({}),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} deletes a submission`,
    },
  ];
  successSuite(httpRequestOptions.slice(0, 2));
  negativeSuite(httpRequestOptions[2], {
    forbiddenRolesForAction,
    forbiddenRolesForRole,
    allowNotFound: true,
  });
});

await describe('Testing get all assignment submissions', () => {
  let assignmentId: string;
  beforeAll(async () => {
    const studentId = await createRandomUserAndGetId('STUDENT', adminToken);
    assignmentId = await createRandomAssignmentAndGetId(courseId, adminToken);

    await enrollStudentAndAccept(studentId, courseId, adminToken);
    await createSubmissionAndGetId(assignmentId, studentId, adminToken);
  });
  const method = 'GET';
  const getUrl = () => `/assignments/${assignmentId}/submissions/`;
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];
  const forbiddenRolesForAction = [
    {
      type: 'Forbidden Instructor',
      getToken: () => `Bearer ${forbiddenInstructorToken}`,
    },
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
      getDescribeString: (role: string) => `should ${role} gets a submission`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    allowNotFound: true,
  });
});

await describe('Testing score submission', () => {
  const submissionIds: string[] = [];
  beforeAll(async () => {
    for (let i = 0; i < 3; i++) {
      const studentId = await createRandomUserAndGetId('STUDENT', adminToken);
      await enrollStudentAndAccept(studentId, courseId, adminToken);
      const submissionId = await createSubmissionAndGetId(
        assignmentId,
        studentId,
        adminToken,
      );
      submissionIds.push(submissionId);
    }
  });
  const method = 'PATCH';
  const getBody = () => ({
    score: 50,
  });
  const roles = [
    { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
    { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
  ];
  const forbiddenRolesForRole = [
    { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
  ];
  const forbiddenRolesForAction = [
    {
      type: 'Forbidden Instructor',
      getToken: () => `Bearer ${forbiddenInstructorToken}`,
    },
  ];
  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl: () => `/submissions/${submissionIds[0]}`,
      getBody,
      roles: [roles[0]],
      getDescribeString: (role: string) => `should ${role} scores a submission`,
    },
    {
      method,
      getUrl: () => `/submissions/${submissionIds[1]}`,
      getBody,
      roles: [roles[1]],
      getDescribeString: (role: string) => `should ${role} scores a submission`,
    },
    {
      method,
      getUrl: () => `/submissions/${submissionIds[2]}`,
      getBody,
      roles,
      getDescribeString: (role: string) => `should ${role} scores a submission`,
    },
  ];
  successSuite(httpRequestOptions.slice(0, 2));
  negativeSuite(httpRequestOptions[2], {
    forbiddenRolesForAction,
    forbiddenRolesForRole,
    fields: requiredScoreSubmissionFields,
    allowNotFound: true,
  });
});
