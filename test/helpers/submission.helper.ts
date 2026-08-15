/* eslint-disable @typescript-eslint/no-unused-vars */
import { executeHttpRequest } from '../executors/http.executor.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { expect } from 'vitest';

export async function createSubmission(
  assignmentId: string,
  studentId: string,
  adminToken: string,
) {
  await createSubmissionAndGetId(assignmentId, studentId, adminToken);
}
export async function createSubmissionAndGetId(
  assignmentId: string,
  studentId: string,
  adminToken: string,
) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'POST',
    getBody: () => ({ studentId: parseInt(studentId) }),
    getUrl: () => `/admin/assignments/${assignmentId}/submissions`,
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${adminToken}`,
  );
  expect(response.status).toBe(201);
  return String(response.body.id);
}
export async function scoreSubmission(
  assignmentId: string,
  studentId: string,
  score: number,
  adminToken: string,
) {}
export async function createSubmissionAndScore(
  assignmentId: string,
  studentId: string,
  score: number,
  adminToken: string,
) {}
export async function createSubmissionAndScoreAndGetId(
  assignmentId: string,
  studentId: string,
  score: number,
  adminToken: string,
) {}
