/* eslint-disable @typescript-eslint/no-unused-vars */
import { executeHttpRequest } from '../executors/http.executor.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { expect } from 'vitest';

export async function enrollStudent(studentToken: string, courseId: string) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'POST',
    getBody: () => ({}),
    getUrl: () => `/courses/${courseId}/enrollments`,
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${studentToken}`,
  );
  expect(response.status).toBe(201);
}

export async function unenrollStudent(studentToken: string, courseId: string) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'DELETE',
    getBody: () => ({}),
    getUrl: () => `/courses/${courseId}/enrollments`,
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${studentToken}`,
  );
  expect(response.status).toBe(200);
}
export async function enrollStudentById(
  studentId: string,
  courseId: string,
  adminToken: string,
) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'POST',
    getBody: () => ({ studentId: parseInt(studentId) }),
    getUrl: () => `/admin/courses/${courseId}/enrollments`,
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${adminToken}`,
  );
  expect(response.status).toBe(201);
}
export async function confirmEnrollment(
  studentId: string,
  courseId: string,
  adminToken: string,
  status: string,
) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'PATCH',
    getBody: () => ({ studentId: parseInt(studentId), status }),
    getUrl: () => `/courses/${courseId}/enrollments`,
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${adminToken}`,
  );
  expect(response.status).toBe(200);
}
export async function enrollStudentAndAccept(
  studentId: string,
  courseId: string,
  adminToken: string,
) {
  await confirmEnrollment(studentId, courseId, adminToken, 'ACCEPTED');
}
export async function enrollStudentAndReject(
  studentId: string,
  courseId: string,
  adminToken: string,
) {
  await confirmEnrollment(studentId, courseId, adminToken, 'REJECTED');
}
