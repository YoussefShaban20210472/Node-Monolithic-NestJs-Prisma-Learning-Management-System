/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Resource } from '../enum/resource.enum.js';
import { AuthorizationChecker } from '../interface/authorization-checker.interface.js';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';

@Injectable()
export class LessonChecker implements AuthorizationChecker {
  readonly resource = Resource.LESSON;

  constructor(private readonly prisma: PrismaService) {}
  async owns(lessonId: number, instructorId: number): Promise<boolean> {
    const lesson = await this.prisma.lesson.findFirst({
      where: {
        id: lessonId,
      },
    });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return lesson.instructorId === instructorId;
  }
  async enrolls(lessonId: number, studentId: number): Promise<boolean> {
    const lesson = await this.prisma.lesson.findFirst({
      where: {
        id: lessonId,
      },
    });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    const courseId = lesson.courseId;
    const enrollment = await this.prisma.enrollment.findFirst({
      where: { courseId, studentId },
    });
    return !!enrollment;
  }
}
