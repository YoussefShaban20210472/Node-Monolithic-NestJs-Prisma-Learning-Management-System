/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Resource } from '../enum/resource.enum.js';
import { AuthorizationChecker } from '../interface/authorization-checker.interface.js';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import { EnrollmentStatus } from '../../../generated/prisma/enums.js';

@Injectable()
export class AssignmentChecker implements AuthorizationChecker {
  readonly resource = Resource.ASSIGNMENT;

  constructor(private readonly prisma: PrismaService) {}
  async owns(assignmentId: number, instructorId: number): Promise<boolean> {
    const assignment = await this.prisma.assignment.findFirst({
      where: {
        id: assignmentId,
      },
    });
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    return assignment.instructorId === instructorId;
  }
  async enrolls(assignmentId: number, studentId: number): Promise<boolean> {
    const assignment = await this.prisma.assignment.findFirst({
      where: {
        id: assignmentId,
      },
    });
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }
    const courseId = assignment.courseId;
    const enrollment = await this.prisma.enrollment.findFirst({
      where: { courseId, studentId, status: EnrollmentStatus.ACCEPTED },
    });
    return !!enrollment;
  }
}
