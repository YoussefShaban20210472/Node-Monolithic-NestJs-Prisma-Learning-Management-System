import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorizationChecker } from '../interface/authorization-checker.interface.js';
import { Resource } from '../../common/enum/resource.enum.js';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import { EnrollmentStatus } from '../../../generated/prisma/enums.js';

@Injectable()
export class CourseChecker implements AuthorizationChecker {
  readonly resource = Resource.COURSE;

  constructor(private readonly prisma: PrismaService) {}

  async owns(courseId: number, instructorId: number): Promise<boolean> {
    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
      },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course.instructorId === instructorId;
  }
  async enrolls(courseId: number, studentId: number): Promise<boolean> {
    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
      },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const enrollment = await this.prisma.enrollment.findFirst({
      where: { courseId, studentId, status: EnrollmentStatus.ACCEPTED },
    });
    return !!enrollment;
  }
}
