/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'vitest';

export async function enrollStudent(studentCookie: string, courseId: string) {}

export async function unenrollStudent(
  studentCookie: string,
  courseId: string,
) {}
export async function enrollStudentById(
  studentId: string,
  courseId: string,
  adminCookie: string,
) {}
export async function confirmEnrollment(
  studentId: string,
  courseId: string,
  adminCookie: string,
  status: string,
) {}
export async function enrollStudentAndAccept(
  studentId: string,
  courseId: string,
  adminCookie: string,
) {}
export async function enrollStudentAndReject(
  studentId: string,
  courseId: string,
  adminCookie: string,
) {}
