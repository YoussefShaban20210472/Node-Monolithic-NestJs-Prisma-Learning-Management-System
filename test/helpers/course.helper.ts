/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRandomCourse } from '../factories/course.factory.js';
import { executeHttpRequest } from '../executors/http.executor.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { expect } from 'vitest';

export async function createCourseAndGetId(
  course: object,
  instructorToken: string,
) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'POST',
    getBody: () => course,
    getUrl: () => '/courses',
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${instructorToken}`,
  );
  expect(response.status).toBe(201);
  return String(response.body.id);
}
export async function createRandomCourseAndGetId(instructorToken: string) {
  const course = createRandomCourse();
  return await createCourseAndGetId(course, instructorToken);
}

export async function updateCourseById(courseId: string, adminToken: string) {}
