/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'vitest';
import { executeHttpRequest } from '../executors/http.executor.js';
import { createRandomAssignment } from '../factories/assignment.factory.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
export async function createAssignmentAndGetId(
  assignment: object,
  courseId: string,
  adminToken: string,
) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'POST',
    getBody: () => assignment,
    getUrl: () => `/courses/${courseId}/assignments`,
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${adminToken}`,
  );
  expect(response.status).toBe(201);
  return String(response.body.id);
}
export async function createRandomAssignmentAndGetId(
  courseId: string,
  adminToken: string,
) {
  const assignment = createRandomAssignment();
  return await createAssignmentAndGetId(assignment, courseId, adminToken);
}

export async function deleteAssignmentById(
  assignmentId: string,
  adminCookie: string,
) {}
export async function updateAssignmentById(
  assignmentId: string,
  adminCookie: string,
) {}
