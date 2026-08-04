/* eslint-disable @typescript-eslint/no-unused-vars */
import { executeHttpRequest } from '../executors/http.executor.js';
import { createRandomLesson } from '../factories/lesson.factory.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { expect } from 'vitest';

export async function createLessonAndGetId(
  lesson: object,
  courseId: string,
  adminToken: string,
) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'POST',
    getBody: () => lesson,
    getUrl: () => `/courses/${courseId}/lessons`,
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${adminToken}`,
  );
  expect(response.status).toBe(201);
  return String(response.body.id);
}
export async function createRandomLessonAndGetId(
  courseId: string,
  adminToken: string,
) {
  const lesson = createRandomLesson();
  return await createLessonAndGetId(lesson, courseId, adminToken);
}

export async function getLessonOTPById(lessonId: string, adminToken: string) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'GET',
    getBody: () => ({}),
    getUrl: () => `/lessons/${lessonId}/OTP`,
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${adminToken}`,
  );
  expect(response.status).toBe(200);
  return String(response.body.otp);
}
export async function deleteLessonById(lessonId: string, adminToken: string) {}
export async function updateLessonById(lessonId: string, adminToken: string) {}
