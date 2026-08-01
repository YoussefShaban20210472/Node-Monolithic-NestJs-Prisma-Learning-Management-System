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

export async function unenrollStudent(studentToken: string, courseId: string) {}
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
) {}
export async function enrollStudentAndAccept(
  studentId: string,
  courseId: string,
  adminToken: string,
) {}
export async function enrollStudentAndReject(
  studentId: string,
  courseId: string,
  adminToken: string,
) {}
