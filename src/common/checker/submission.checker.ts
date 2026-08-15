/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Resource } from '../enum/resource.enum.js';
import { AuthorizationChecker } from '../interface/authorization-checker.interface.js';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';

@Injectable()
export class SubmissionChecker implements AuthorizationChecker {
  readonly resource = Resource.Submission;

  constructor(private readonly prisma: PrismaService) {}
  async owns(submissionId: number, instructorId: number): Promise<boolean> {
    const submission = await this.prisma.submission.findFirst({
      where: {
        id: submissionId,
      },
    });
    if (!submission) {
      throw new NotFoundException('Submission not found');
    }
    const assignment = await this.prisma.assignment.findFirst({
      where: { id: submission.assignmentId },
    });

    return assignment?.instructorId === instructorId;
  }
  async enrolls(submissionId: number, studentId: number): Promise<boolean> {
    const submission = await this.prisma.submission.findFirst({
      where: {
        id: submissionId,
      },
    });
    if (!submission) {
      throw new NotFoundException('Submission not found');
    }
    return submission.studentId === studentId;
  }
}
