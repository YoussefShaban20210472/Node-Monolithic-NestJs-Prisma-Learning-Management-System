/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { executeHttpRequest } from '../executors/http.executor.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { expect } from 'vitest';
import { deleteFile, uploadFile } from './mediaFile.helper.js';

export async function createCourseSignedUrlAndGetUrl(
  file: string,
  courseId: string,
  adminToken: string,
  type: 'upload' | 'download' | 'delete',
) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'POST',
    getBody: () => ({ file }),
    getUrl: () => `/courses/${courseId}/mediaFiles/${type}`,
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${adminToken}`,
  );
  expect(response.status).toBe(201);
  return String(response.body.signedUrl);
}
export async function createCourseSignedUploadUrlAndGetUrl(
  file: string,
  courseId: string,
  adminToken: string,
) {
  return await createCourseSignedUrlAndGetUrl(
    file,
    courseId,
    adminToken,
    'upload',
  );
}
export async function createCourseSignedDownloadUrlAndGetUrl(
  file: string,
  courseId: string,
  adminToken: string,
) {
  return await createCourseSignedUrlAndGetUrl(
    file,
    courseId,
    adminToken,
    'download',
  );
}
export async function createCourseSignedDeleteUrlAndGetUrl(
  file: string,
  courseId: string,
  adminToken: string,
) {
  return await createCourseSignedUrlAndGetUrl(
    file,
    courseId,
    adminToken,
    'delete',
  );
}
export async function confrimCourseSignedUrl(
  file: string,
  courseId: string,
  adminToken: string,
  type: 'upload' | 'delete',
) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'POST',
    getBody: () => ({ file }),
    getUrl: () => `/courses/${courseId}/mediaFiles/${type}/confirm`,
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${adminToken}`,
  );
  expect(response.status).toBe(201);
}
export async function confirmCourseSignedUploadUrl(
  file: string,
  courseId: string,
  adminToken: string,
) {
  await confrimCourseSignedUrl(file, courseId, adminToken, 'upload');
}
export async function confirmCourseSignedDeleteUrl(
  file: string,
  courseId: string,
  adminToken: string,
) {
  await confrimCourseSignedUrl(file, courseId, adminToken, 'delete');
}

export async function createCourseSignedUploadUrlAndUploadFile(
  file: string,
  courseId: string,
  adminToken: string,
) {
  const url = await createCourseSignedUploadUrlAndGetUrl(
    file,
    courseId,
    adminToken,
  );
  const response = await uploadFile(url, file);
  expect(response.status).toBe(200);
}
export async function createCourseSignedUploadUrlAndUploadFileAndConfirm(
  file: string,
  courseId: string,
  adminToken: string,
) {
  await createCourseSignedUploadUrlAndUploadFile(file, courseId, adminToken);
  await confirmCourseSignedUploadUrl(file, courseId, adminToken);
}

export async function uploadFileAndCreateCourseSignedDeleteUrlAndDeleteFile(
  file: string,
  courseId: string,
  adminToken: string,
) {
  await createCourseSignedUploadUrlAndUploadFileAndConfirm(
    file,
    courseId,
    adminToken,
  );
  const url = await createCourseSignedDeleteUrlAndGetUrl(
    file,
    courseId,
    adminToken,
  );
  const response = await deleteFile(url);
  expect(response.status).toBe(200);
}
export async function uploadFileAndCreateCourseSignedDeleteUrlAndDeleteFileAndConfirm(
  file: string,
  courseId: string,
  adminToken: string,
) {
  await uploadFileAndCreateCourseSignedDeleteUrlAndDeleteFile(
    file,
    courseId,
    adminToken,
  );
  await confirmCourseSignedDeleteUrl(file, courseId, adminToken);
}
