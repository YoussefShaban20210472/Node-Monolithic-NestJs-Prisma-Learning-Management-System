/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-submission */
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
  createSubmissionSignedDeleteUrlAndGetUrl,
  createSubmissionSignedDownloadUrlAndGetUrl,
  createSubmissionSignedUploadUrlAndGetUrl,
  createSubmissionSignedUploadUrlAndUploadFile,
  createSubmissionSignedUploadUrlAndUploadFileAndConfirm,
  uploadFileAndCreateSubmissionSignedDeleteUrlAndDeleteFile,
} from '../helpers/submissionMediaFile.helper.js';
import {
  deleteFile,
  downloadFile,
  uploadFile,
} from '../helpers/mediaFile.helper.js';
import { createRandomCourseAndGetId } from '../helpers/course.helper.js';
import { createRandomAssignmentAndGetId } from '../helpers/assignment.helper.js';
import { createSubmissionAndGetId } from '../helpers/submission.helper.js';

let adminToken: string;
let instructorToken: string;
let studentToken: string;
let forbiddenInstructorToken: string;
let forbiddenStudentToken: string;
let courseId: string;
let assignmentId: string;
let submissionId: string;

beforeAll(async () => {
  adminToken = await loginAndGetToken(adminLogin);
  instructorToken = await loginAndGetToken(instructorLogin);
  studentToken = await loginAndGetToken(studentLogin);
  const studentId = await getUserId(studentToken);
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

  await enrollStudentAndAccept(studentId, courseId, adminToken);
  submissionId = await createSubmissionAndGetId(
    assignmentId,
    studentId,
    adminToken,
  );
});

const forbiddenRolesForAction = [
  {
    type: 'Forbidden Student',
    getToken: () => `Bearer ${forbiddenStudentToken}`,
  },
];
const forbiddenRolesForRole = [
  { type: 'INSTRUCTOR', getToken: () => `Bearer ${instructorToken}` },
];
const roles = [
  { type: 'ADMIN', getToken: () => `Bearer ${adminToken}` },

  { type: 'STUDENT', getToken: () => `Bearer ${studentToken}` },
];

await describe('Testing create signed upload submission media file url', () => {
  const method = 'POST';
  const getUrl = () => `/submissions/${submissionId}/mediaFiles/upload`;

  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: createRandomMediaFile,
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a new upload submission media file url`,
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
await describe('Testing upload a submission media file', async () => {
  await describe('Positive', () => {
    let filename: string;
    let url: string;
    beforeEach(async () => {
      filename = createRandomMediaFile().file;
      url = await createSubmissionSignedUploadUrlAndGetUrl(
        filename,
        submissionId,
        adminToken,
      );
    });
    roles.forEach((role) => {
      it(`Should ${role.type} uploads a submission media file`, async () => {
        const response = await uploadFile(url, filename);
        const body = await response.json();
        console.log(body);
        expect(response.status).toBe(200);
      });
    });
  });
});

await describe('Testing confirm a submission signed upload url', () => {
  const filenames: string[] = [];
  beforeAll(async () => {
    for (let i = 0; i < 3; i++) {
      const filename = createRandomMediaFile().file;
      await createSubmissionSignedUploadUrlAndUploadFile(
        filename,
        submissionId,
        adminToken,
      );

      filenames.push(filename);
    }
  });
  const method = 'POST';
  const getUrl = () => `/submissions/${submissionId}/mediaFiles/upload/confirm`;

  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[0] }),
      roles: [roles[0]],
      getDescribeString: (role: string) =>
        `should ${role} confirms a upload submission media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[1] }),
      roles: [roles[1]],
      getDescribeString: (role: string) =>
        `should ${role} confirms a upload submission media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[2] }),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} confirms a upload submission media file url`,
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
await describe('Testing create signed delete submission media file url', () => {
  const filenames: string[] = [];
  beforeAll(async () => {
    for (let i = 0; i < 3; i++) {
      const filename = createRandomMediaFile().file;
      await createSubmissionSignedUploadUrlAndUploadFileAndConfirm(
        filename,
        submissionId,
        adminToken,
      );
      filenames.push(filename);
    }
  });
  const method = 'POST';
  const getUrl = () => `/submissions/${submissionId}/mediaFiles/delete`;

  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[0] }),
      roles: [roles[0]],
      getDescribeString: (role: string) =>
        `should ${role} creates a delete submission media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[1] }),
      roles: [roles[1]],
      getDescribeString: (role: string) =>
        `should ${role} creates a delete submission media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[2] }),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a delete submission media file url`,
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
await describe('Testing delete a submission media file', async () => {
  await describe('Positive', () => {
    let filename: string;
    let url: string;
    beforeEach(async () => {
      filename = createRandomMediaFile().file;
      await createSubmissionSignedUploadUrlAndUploadFileAndConfirm(
        filename,
        submissionId,
        adminToken,
      );
      url = await createSubmissionSignedDeleteUrlAndGetUrl(
        filename,
        submissionId,
        adminToken,
      );
    });
    roles.forEach((role) => {
      it(`Should ${role.type} deletes a submission media file`, async () => {
        const response = await deleteFile(url);
        const body = await response.json();
        console.log(body);
        expect(response.status).toBe(200);
      });
    });
  });
});

await describe('Testing confirm a submission signed delete url', () => {
  const filenames: string[] = [];
  beforeAll(async () => {
    for (let i = 0; i < 3; i++) {
      const filename = createRandomMediaFile().file;
      await uploadFileAndCreateSubmissionSignedDeleteUrlAndDeleteFile(
        filename,
        submissionId,
        adminToken,
      );
      filenames.push(filename);
    }
  });
  const method = 'POST';
  const getUrl = () => `/submissions/${submissionId}/mediaFiles/delete/confirm`;

  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[0] }),
      roles: [roles[0]],
      getDescribeString: (role: string) =>
        `should ${role} confirms a delete submission media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[1] }),
      roles: [roles[1]],
      getDescribeString: (role: string) =>
        `should ${role} confirms a delete submission media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[2] }),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} confirms a delete submission media file url`,
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

await describe('Testing create signed download submission media file url', () => {
  const filenames: string[] = [];
  beforeAll(async () => {
    for (let i = 0; i < 3; i++) {
      const filename = createRandomMediaFile().file;
      await createSubmissionSignedUploadUrlAndUploadFileAndConfirm(
        filename,
        submissionId,
        adminToken,
      );
      filenames.push(filename);
    }
  });
  const method = 'POST';
  const getUrl = () => `/submissions/${submissionId}/mediaFiles/download`;

  const httpRequestOptions: HttpRequestOptionsType[] = [
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[0] }),
      roles: [roles[0]],
      getDescribeString: (role: string) =>
        `should ${role} creates a download submission media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[1] }),
      roles: [roles[1]],
      getDescribeString: (role: string) =>
        `should ${role} creates a download submission media file url`,
    },
    {
      method,
      getUrl,
      getBody: () => ({ file: filenames[2] }),
      roles,
      getDescribeString: (role: string) =>
        `should ${role} creates a download submission media file url`,
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
await describe('Testing download a submission media file', async () => {
  await describe('Positive', () => {
    let filename: string;
    let url: string;
    beforeEach(async () => {
      filename = createRandomMediaFile().file;
      await createSubmissionSignedUploadUrlAndUploadFileAndConfirm(
        filename,
        submissionId,
        adminToken,
      );
      url = await createSubmissionSignedDownloadUrlAndGetUrl(
        filename,
        submissionId,
        adminToken,
      );
    });
    roles.forEach((role) => {
      it(`Should ${role.type} downloads a submission media file`, async () => {
        const response = await downloadFile(url);
        expect(response.status).toBe(200);
      });
    });
  });
});

await describe('Testing get all submission media files', () => {
  beforeAll(async () => {
    const filename = createRandomMediaFile().file;
    await createSubmissionSignedUploadUrlAndUploadFileAndConfirm(
      filename,
      submissionId,
      adminToken,
    );
  });
  const method = 'GET';
  const getUrl = () => `/submissions/${submissionId}/mediaFiles`;
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
        `should ${role} gets all submission media files`,
    },
  ];
  successSuite(httpRequestOptions);
  negativeSuite(httpRequestOptions[0], {
    forbiddenRolesForAction,
    // allowNotFound: true,
  });
});
