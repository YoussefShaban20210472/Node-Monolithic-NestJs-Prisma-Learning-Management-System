/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';

@Injectable()
export class AttendanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(lessonId: number, studentId: number) {
    return this.prisma.attendance.create({
      data: {
        lesson: {
          connect: { id: lessonId },
        },
        student: {
          connect: { id: studentId },
        },
      },
    });
  }

  findAll(lessonId: number, skip = 0, take = 10) {
    return this.prisma.attendance.findMany({
      where: { lessonId },
      skip,
      take,
    });
  }

  findOne(lessonId: number, studentId: number) {
    return this.prisma.attendance.findUnique({
      where: { lessonId_studentId: { lessonId, studentId } },
    });
  }
}
