/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { executeHttpRequest } from '../executors/http.executor.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { expect } from 'vitest';
import { deleteFile, uploadFile } from './mediaFile.helper.js';

export async function createAssignmentSignedUrlAndGetUrl(
  file: string,
  assignmentId: string,
  adminToken: string,
  type: 'upload' | 'download' | 'delete',
) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'POST',
    getBody: () => ({ file }),
    getUrl: () => `/assignments/${assignmentId}/mediaFiles/${type}`,
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${adminToken}`,
  );
  expect(response.status).toBe(201);
  return String(response.body.signedUrl);
}
export async function createAssignmentSignedUploadUrlAndGetUrl(
  file: string,
  assignmentId: string,
  adminToken: string,
) {
  return await createAssignmentSignedUrlAndGetUrl(
    file,
    assignmentId,
    adminToken,
    'upload',
  );
}
export async function createAssignmentSignedDownloadUrlAndGetUrl(
  file: string,
  assignmentId: string,
  adminToken: string,
) {
  return await createAssignmentSignedUrlAndGetUrl(
    file,
    assignmentId,
    adminToken,
    'download',
  );
}
export async function createAssignmentSignedDeleteUrlAndGetUrl(
  file: string,
  assignmentId: string,
  adminToken: string,
) {
  return await createAssignmentSignedUrlAndGetUrl(
    file,
    assignmentId,
    adminToken,
    'delete',
  );
}
export async function confirmAssignmentSignedUrl(
  file: string,
  assignmentId: string,
  adminToken: string,
  type: 'upload' | 'delete',
) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'POST',
    getBody: () => ({ file }),
    getUrl: () => `/assignments/${assignmentId}/mediaFiles/${type}/confirm`,
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${adminToken}`,
  );
  expect(response.status).toBe(201);
}
export async function confirmAssignmentSignedUploadUrl(
  file: string,
  assignmentId: string,
  adminToken: string,
) {
  await confirmAssignmentSignedUrl(file, assignmentId, adminToken, 'upload');
}
export async function confirmAssignmentSignedDeleteUrl(
  file: string,
  assignmentId: string,
  adminToken: string,
) {
  await confirmAssignmentSignedUrl(file, assignmentId, adminToken, 'delete');
}

export async function createAssignmentSignedUploadUrlAndUploadFile(
  file: string,
  assignmentId: string,
  adminToken: string,
) {
  const url = await createAssignmentSignedUploadUrlAndGetUrl(
    file,
    assignmentId,
    adminToken,
  );
  const response = await uploadFile(url, file);
  expect(response.status).toBe(200);
}
export async function createAssignmentSignedUploadUrlAndUploadFileAndConfirm(
  file: string,
  assignmentId: string,
  adminToken: string,
) {
  await createAssignmentSignedUploadUrlAndUploadFile(
    file,
    assignmentId,
    adminToken,
  );
  await confirmAssignmentSignedUploadUrl(file, assignmentId, adminToken);
}

export async function uploadFileAndCreateAssignmentSignedDeleteUrlAndDeleteFile(
  file: string,
  assignmentId: string,
  adminToken: string,
) {
  await createAssignmentSignedUploadUrlAndUploadFileAndConfirm(
    file,
    assignmentId,
    adminToken,
  );
  const url = await createAssignmentSignedDeleteUrlAndGetUrl(
    file,
    assignmentId,
    adminToken,
  );
  const response = await deleteFile(url);
  expect(response.status).toBe(200);
}
export async function uploadFileAndCreateAssignmentSignedDeleteUrlAndDeleteFileAndConfirm(
  file: string,
  assignmentId: string,
  adminToken: string,
) {
  await uploadFileAndCreateAssignmentSignedDeleteUrlAndDeleteFile(
    file,
    assignmentId,
    adminToken,
  );
  await confirmAssignmentSignedDeleteUrl(file, assignmentId, adminToken);
}
