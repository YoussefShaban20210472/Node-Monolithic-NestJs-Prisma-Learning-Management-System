/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'vitest';

export async function createQuizAttemptByAdmin(
  quizAttempt: unknown,
  adminCookie: string,
) {}
export async function createRandomQuizAttemptByAdmin(
  quizId: string,
  studentId: string,
  questionIdsAndAnswers: { questionId: string; answer: string }[],
  adminCookie: string,
) {}
