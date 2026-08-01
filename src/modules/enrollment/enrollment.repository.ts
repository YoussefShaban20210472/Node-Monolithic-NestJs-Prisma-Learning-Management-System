import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import { EnrollmentStatus } from '../../../generated/prisma/enums.js';

@Injectable()
export class EnrollmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(courseId: number, studentId: number) {
    return this.prisma.enrollment.create({
      data: {
        course: {
          connect: { id: courseId },
        },
        student: {
          connect: { id: studentId },
        },
      },
    });
  }

  findAll(skip = 0, take = 10) {
    return this.prisma.enrollment.findMany({
      skip,
      take,
    });
  }

  findOne(courseId: number, studentId: number) {
    return this.prisma.enrollment.findUnique({
      where: { courseId_studentId: { courseId, studentId } },
    });
  }
  updateOne(courseId: number, studentId: number, status: EnrollmentStatus) {
    return this.prisma.enrollment.update({
      where: { courseId_studentId: { courseId, studentId } },
      data: {
        status,
      },
    });
  }

  deleteOne(courseId: number, studentId: number) {
    return this.prisma.enrollment.delete({
      where: {
        courseId_studentId: { courseId, studentId },
        status: EnrollmentStatus.ACCEPTED,
      },
    });
  }
}
