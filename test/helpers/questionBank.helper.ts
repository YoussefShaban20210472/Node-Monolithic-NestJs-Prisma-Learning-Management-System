/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'vitest';
const types = ['MCQ', 'TRUE_FALSE', 'SHORT_ANSWER'];

export async function createQuestionBankAndGetId(
  questionBank: unknown,
  adminCookie: string,
) {}
export async function createRandomQuestionBankAndGetId(
  courseId: string,
  type: string,
  adminCookie: string,
) {}

export async function createRandomQuestionBanksAndGetIds(
  courseId: string,
  adminCookie: string,
  minCount: number = 10,
  maxCount: number = 20,
) {}

export async function createRandomQuestionBanksAndGetIdsAndGetAnswers(
  courseId: string,
  adminCookie: string,
  minCount: number = 10,
  maxCount: number = 20,
) {}
