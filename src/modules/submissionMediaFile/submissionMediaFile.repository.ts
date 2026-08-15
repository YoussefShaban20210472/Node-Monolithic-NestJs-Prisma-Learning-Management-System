/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';

@Injectable()
export class SubmissionMediaFileRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(submissionId: number, file: string, path: string) {
    return this.prisma.submissionMediaFile.create({
      data: {
        submission: {
          connect: { id: submissionId },
        },
        file,
        path,
      },
    });
  }
  deleteByPath(path: string) {
    return this.prisma.submissionMediaFile.delete({
      where: { path },
    });
  }
  findByPath(path: string) {
    return this.prisma.submissionMediaFile.findUnique({
      where: { path },
    });
  }
  findAll(submissionId: number, skip = 0, take = 10) {
    return this.prisma.submissionMediaFile.findMany({
      where: { submissionId },
      skip,
      take,
      orderBy: {
        uploadedAt: 'desc',
      },
    });
  }
}
