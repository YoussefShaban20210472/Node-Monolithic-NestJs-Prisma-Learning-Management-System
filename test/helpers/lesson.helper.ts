/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'vitest';

export async function createLessonAndGetId(
  lesson: unknown,
  adminCookie: string,
) {}
export async function createRandomLessonAndGetId(
  courseId: string,
  adminCookie: string,
) {}

export async function getLessonOTPById(lessonId: string, adminCookie: string) {}
export async function deleteLessonById(lessonId: string, adminCookie: string) {}
export async function updateLessonById(lessonId: string, adminCookie: string) {}
