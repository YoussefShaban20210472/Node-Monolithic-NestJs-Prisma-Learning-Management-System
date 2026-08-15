/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';

@Injectable()
export class SubmissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(assignmentId: number, studentId: number) {
    return this.prisma.submission.create({
      data: {
        assignment: {
          connect: { id: assignmentId },
        },
        student: {
          connect: { id: studentId },
        },
        score: 0,
      },
    });
  }

  deleteById(id: number) {
    return this.prisma.submission.delete({
      where: { id },
    });
  }
  findById(id: number) {
    return this.prisma.submission.findUnique({
      where: { id },
    });
  }
  findAll(assignmentId: number, skip = 0, take = 10) {
    return this.prisma.submission.findMany({
      where: { assignmentId },
      skip,
      take,
      orderBy: {
        submittedAt: 'desc',
      },
    });
  }
  updateById(id: number, score: number) {
    return this.prisma.submission.update({
      where: { id },
      data: { score, scoredAt: new Date() },
    });
  }
}
