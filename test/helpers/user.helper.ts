/* eslint-disable @typescript-eslint/no-unused-vars */
import { executeHttpRequest } from '../executors/http.executor.js';
import { HttpRequestOptionsType } from '../types/http-request-options-type.js';
import { expect } from 'vitest';
export async function loginAndGetToken(account: {
  email?: string;
  password?: string;
}): Promise<string> {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'POST',
    getBody: () => ({ email: account.email, password: account.password }),
    getUrl: () => '/auth/login',
  };
  const response = await executeHttpRequest(httpRequestOptions);
  expect(response.status).toBe(200);
  return String(response.body.accessToken);
}

export async function createUserAndGetId(user: object, adminToken: string) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'POST',
    getBody: () => user,
    getUrl: () => '/user',
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => adminToken,
  );
  expect(response.status).toBe(200);
  return String(response.body.user.id);
}
export async function createRandomUserAndGetId(
  role: string,
  adminToken: string,
) {}

export async function createUserAndLoginAndGetToken(
  user: unknown,
  adminToken: string,
) {}
export async function createRandomUserAndLoginAndGetToken(
  role: string,
  adminToken: string,
) {}

export async function getUserId(userToken: string) {}
