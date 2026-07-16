/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'vitest';
export async function loginAndGetCookie(account: {
  email?: string;
  password?: string;
}) {}

export async function createUserAndGetId(user: unknown, adminCookie: string) {}
export async function createRandomUserAndGetId(
  role: string,
  adminCookie: string,
) {}

export async function createUserAndLoginAndGetCookie(
  user: unknown,
  adminCookie: string,
) {}
export async function createRandomUserAndLoginAndGetCookie(
  role: string,
  adminCookie: string,
) {}

export async function getUserId(userCookie: string) {}
