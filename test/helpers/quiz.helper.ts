/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'vitest';

export async function createQuizAndGetId(quiz: unknown, adminCookie: string) {}
export async function createRandomQuizAndGetId(
  courseId: string,
  questionIds: string[],
  adminCookie: string,
) {}

export async function deleteQuizById(quizId: string, adminCookie: string) {}
export async function updateQuizById(quizId: string, adminCookie: string) {}
