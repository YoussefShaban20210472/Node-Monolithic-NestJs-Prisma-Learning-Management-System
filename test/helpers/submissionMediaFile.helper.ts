/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { executeHttpRequest } from '../executors/http.executor.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { expect } from 'vitest';
import { deleteFile, uploadFile } from './mediaFile.helper.js';

export async function createSubmissionSignedUrlAndGetUrl(
  file: string,
  submissionId: string,
  adminToken: string,
  type: 'upload' | 'download' | 'delete',
) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'POST',
    getBody: () => ({ file }),
    getUrl: () => `/submissions/${submissionId}/mediaFiles/${type}`,
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${adminToken}`,
  );
  expect(response.status).toBe(201);
  return String(response.body.signedUrl);
}
export async function createSubmissionSignedUploadUrlAndGetUrl(
  file: string,
  submissionId: string,
  adminToken: string,
) {
  return await createSubmissionSignedUrlAndGetUrl(
    file,
    submissionId,
    adminToken,
    'upload',
  );
}
export async function createSubmissionSignedDownloadUrlAndGetUrl(
  file: string,
  submissionId: string,
  adminToken: string,
) {
  return await createSubmissionSignedUrlAndGetUrl(
    file,
    submissionId,
    adminToken,
    'download',
  );
}
export async function createSubmissionSignedDeleteUrlAndGetUrl(
  file: string,
  submissionId: string,
  adminToken: string,
) {
  return await createSubmissionSignedUrlAndGetUrl(
    file,
    submissionId,
    adminToken,
    'delete',
  );
}
export async function confirmSubmissionSignedUrl(
  file: string,
  submissionId: string,
  adminToken: string,
  type: 'upload' | 'delete',
) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'POST',
    getBody: () => ({ file }),
    getUrl: () => `/submissions/${submissionId}/mediaFiles/${type}/confirm`,
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${adminToken}`,
  );
  expect(response.status).toBe(201);
}
export async function confirmSubmissionSignedUploadUrl(
  file: string,
  submissionId: string,
  adminToken: string,
) {
  await confirmSubmissionSignedUrl(file, submissionId, adminToken, 'upload');
}
export async function confirmSubmissionSignedDeleteUrl(
  file: string,
  submissionId: string,
  adminToken: string,
) {
  await confirmSubmissionSignedUrl(file, submissionId, adminToken, 'delete');
}

export async function createSubmissionSignedUploadUrlAndUploadFile(
  file: string,
  submissionId: string,
  adminToken: string,
) {
  const url = await createSubmissionSignedUploadUrlAndGetUrl(
    file,
    submissionId,
    adminToken,
  );
  const response = await uploadFile(url, file);
  expect(response.status).toBe(200);
}
export async function createSubmissionSignedUploadUrlAndUploadFileAndConfirm(
  file: string,
  submissionId: string,
  adminToken: string,
) {
  await createSubmissionSignedUploadUrlAndUploadFile(
    file,
    submissionId,
    adminToken,
  );
  await confirmSubmissionSignedUploadUrl(file, submissionId, adminToken);
}

export async function uploadFileAndCreateSubmissionSignedDeleteUrlAndDeleteFile(
  file: string,
  submissionId: string,
  adminToken: string,
) {
  await createSubmissionSignedUploadUrlAndUploadFileAndConfirm(
    file,
    submissionId,
    adminToken,
  );
  const url = await createSubmissionSignedDeleteUrlAndGetUrl(
    file,
    submissionId,
    adminToken,
  );
  const response = await deleteFile(url);
  expect(response.status).toBe(200);
}
export async function uploadFileAndCreateSubmissionSignedDeleteUrlAndDeleteFileAndConfirm(
  file: string,
  submissionId: string,
  adminToken: string,
) {
  await uploadFileAndCreateSubmissionSignedDeleteUrlAndDeleteFile(
    file,
    submissionId,
    adminToken,
  );
  await confirmSubmissionSignedDeleteUrl(file, submissionId, adminToken);
}
