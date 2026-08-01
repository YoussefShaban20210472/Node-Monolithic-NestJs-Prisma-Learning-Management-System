/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRandomUser } from '../factories/user.factory.js';
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
    getUrl: () => '/users',
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${adminToken}`,
  );
  expect(response.status).toBe(201);
  return String(response.body.id);
}
export async function createRandomUserAndGetId(
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT',
  adminToken: string,
) {
  const user = createRandomUser(role);
  return await createUserAndGetId(user, adminToken);
}

export async function createUserAndLoginAndGetToken(
  user: object,
  adminToken: string,
) {
  await createUserAndGetId(user, adminToken);
  return await loginAndGetToken(user);
}
export async function createRandomUserAndLoginAndGetToken(
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT',
  adminToken: string,
) {
  const user = createRandomUser(role);
  return await createUserAndLoginAndGetToken(user, adminToken);
}

export async function getUserId(userToken: string) {
  const httpRequestOptions: HttpRequestOptionsType = {
    method: 'GET',
    getBody: () => ({}),
    getUrl: () => '/users/me',
  };
  const response = await executeHttpRequest(
    httpRequestOptions,
    () => `Bearer ${userToken}`,
  );
  expect(response.status).toBe(200);
  return String(response.body.id);
}
