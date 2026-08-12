/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { beforeAll, beforeEach, expect, it } from 'vitest';
import { negativeSuite } from '../suites/negative.suite.js';

import {
  enrollStudent,
  enrollStudentAndAccept,
} from '../helpers/enrollment.helper.js';
import { createRandomMediaFile } from '../factories/mediaFile.factory.js';
import { requiredSignedUrlFields } from '../schemas/mediaFile.schema.js';
import {
  createAssignmentSignedDeleteUrlAndGetUrl,
  createAssignmentSignedDownloadUrlAndGetUrl,
  createAssignmentSignedUploadUrlAndGetUrl,
  createAssignmentSignedUploadUrlAndUploadFile,
  createAssignmentSignedUploadUrlAndUploadFileAndConfirm,
  uploadFileAndCreateAssignmentSignedDeleteUrlAndDeleteFile,
} from '../helpers/assignmentMediaFile.helper.js';
import {
  deleteFile,
  downloadFile,
  uploadFile,
} from '../helpers/mediaFile.helper.js';
import { createRandomAssignmentAndGetId } from '../helpers/assignment.helper.js';
import { createRandomCourseAndGetId } from '../helpers/course.helper.js';

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
const roles = [
  { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },
  { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
];

await describe('Testing create signed upload assignment media file url', () => {
  const method = 'POST';
  const getUrl = () => `/assignments/${assignmentId}/mediaFiles/upload`;

  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: createRandomMediaFile,
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a new upload assignment media file url`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    fields: requiredSignedUrlFields,
    // allowNotFound: true,
  });
});
await describe('Testing upload a assignment media file', async () => {
  await describe('Positive', () => {
    let filename: string;
    let url: string;
    beforeEach(async () => {
      filename = createRandomMediaFile().file;
      url = await createAssignmentSignedUploadUrlAndGetUrl(
        filename,
        assignmentId,
        adminToken,
      );
    });
    roles.forEach((role) => {
      it(`Should ${role.type} uploads a assignment media file`, async () => {
        const response = await uploadFile(url, filename);
        const body = await response.json();
        console.log(body);
        expect(response.status).toBe(200);
      });
    });
  });
});

await describe('Testing confirm a assignment signed upload url', () => {
  const filenames: string[] = [];
  beforeAll(async () => {
    for (let i = 0; i < 3; i++) {
      const filename = createRandomMediaFile().file;
      await createAssignmentSignedUploadUrlAndUploadFile(
        filename,
        assignmentId,
        adminToken,
      );

      filenames.push(filename);
    }
  });
  const method = 'POST';
  const getUrl = () => `/assignments/${assignmentId}/mediaFiles/upload/confirm`;

  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[0] }),
      roles: [roles[0]],
      getDescribeString: (role: string) =>
        `should ${role} confirms a upload assignment media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[1] }),
      roles: [roles[1]],
      getDescribeString: (role: string) =>
        `should ${role} confirms a upload assignment media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[2] }),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} confirms a upload assignment media file url`,
    },
  ];
  successSuite(httpRequestOptions.slice(0, 2));
  negativeSuite(httpRequestOptions[2], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    fields: requiredSignedUrlFields,
    // allowNotFound: true,
  });
});
await describe('Testing create signed delete assignment media file url', () => {
  const filenames: string[] = [];
  beforeAll(async () => {
    for (let i = 0; i < 3; i++) {
      const filename = createRandomMediaFile().file;
      await createAssignmentSignedUploadUrlAndUploadFileAndConfirm(
        filename,
        assignmentId,
        adminToken,
      );
      filenames.push(filename);
    }
  });
  const method = 'POST';
  const getUrl = () => `/assignments/${assignmentId}/mediaFiles/delete`;

  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[0] }),
      roles: [roles[0]],
      getDescribeString: (role: string) =>
        `should ${role} creates a delete assignment media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[1] }),
      roles: [roles[1]],
      getDescribeString: (role: string) =>
        `should ${role} creates a delete assignment media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[2] }),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a delete assignment media file url`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    fields: requiredSignedUrlFields,
    // allowNotFound: true,
  });
});
await describe('Testing delete a assignment media file', async () => {
  await describe('Positive', () => {
    let filename: string;
    let url: string;
    beforeEach(async () => {
      filename = createRandomMediaFile().file;
      await createAssignmentSignedUploadUrlAndUploadFileAndConfirm(
        filename,
        assignmentId,
        adminToken,
      );
      url = await createAssignmentSignedDeleteUrlAndGetUrl(
        filename,
        assignmentId,
        adminToken,
      );
    });
    roles.forEach((role) => {
      it(`Should ${role.type} deletes a assignment media file`, async () => {
        const response = await deleteFile(url);
        const body = await response.json();
        console.log(body);
        expect(response.status).toBe(200);
      });
    });
  });
});

await describe('Testing confirm a assignment signed delete url', () => {
  const filenames: string[] = [];
  beforeAll(async () => {
    for (let i = 0; i < 3; i++) {
      const filename = createRandomMediaFile().file;
      await uploadFileAndCreateAssignmentSignedDeleteUrlAndDeleteFile(
        filename,
        assignmentId,
        adminToken,
      );
      filenames.push(filename);
    }
  });
  const method = 'POST';
  const getUrl = () => `/assignments/${assignmentId}/mediaFiles/delete/confirm`;

  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[0] }),
      roles: [roles[0]],
      getDescribeString: (role: string) =>
        `should ${role} confirms a delete assignment media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[1] }),
      roles: [roles[1]],
      getDescribeString: (role: string) =>
        `should ${role} confirms a delete assignment media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[2] }),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} confirms a delete assignment media file url`,
    },
  ];
  successSuite(httpRequestOptions.slice(0, 2));
  negativeSuite(httpRequestOptions[2], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    fields: requiredSignedUrlFields,
    // allowNotFound: true,
  });
});

await describe('Testing create signed download assignment media file url', () => {
  const filenames: string[] = [];
  beforeAll(async () => {
    for (let i = 0; i < 3; i++) {
      const filename = createRandomMediaFile().file;
      await createAssignmentSignedUploadUrlAndUploadFileAndConfirm(
        filename,
        assignmentId,
        adminToken,
      );
      filenames.push(filename);
    }
  });
  const method = 'POST';
  const getUrl = () => `/assignments/${assignmentId}/mediaFiles/download`;

  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[0] }),
      roles: [roles[0]],
      getDescribeString: (role: string) =>
        `should ${role} creates a download assignment media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[1] }),
      roles: [roles[1]],
      getDescribeString: (role: string) =>
        `should ${role} creates a download assignment media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[2] }),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a download assignment media file url`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForRole,
    forbiddenRolesForAction,
    fields: requiredSignedUrlFields,
    // allowNotFound: true,
  });
});
await describe('Testing download a assignment media file', async () => {
  await describe('Positive', () => {
    let filename: string;
    let url: string;
    beforeEach(async () => {
      filename = createRandomMediaFile().file;
      await createAssignmentSignedUploadUrlAndUploadFileAndConfirm(
        filename,
        assignmentId,
        adminToken,
      );
      url = await createAssignmentSignedDownloadUrlAndGetUrl(
        filename,
        assignmentId,
        adminToken,
      );
    });
    roles.forEach((role) => {
      it(`Should ${role.type} downloads a assignment media file`, async () => {
        const response = await downloadFile(url);
        expect(response.status).toBe(200);
      });
    });
  });
});

await describe('Testing get all assignment media files', () => {
  beforeAll(async () => {
    const filename = createRandomMediaFile().file;
    await createAssignmentSignedUploadUrlAndUploadFileAndConfirm(
      filename,
      assignmentId,
      adminToken,
    );
  });
  const method = 'GET';
  const getUrl = () => `/courses/${assignmentId}/mediaFiles`;
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
        `should ${role} gets all assignment media files`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForAction,
    // allowNotFound: true,
  });
});
