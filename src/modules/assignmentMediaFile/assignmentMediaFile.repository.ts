/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';

@Injectable()
export class AssignmentMediaFileRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(assignmentId: number, file: string, path: string) {
    return this.prisma.assignmentMediaFile.create({
      data: {
        assignment: {
          connect: { id: assignmentId },
        },
        file,
        path,
      },
    });
  }
  deleteByPath(path: string) {
    return this.prisma.assignmentMediaFile.delete({
      where: { path },
    });
  }
  findByPath(path: string) {
    return this.prisma.assignmentMediaFile.findUnique({
      where: { path },
    });
  }
  findAll(assignmentId: number, skip = 0, take = 10) {
    return this.prisma.assignmentMediaFile.findMany({
      where: { assignmentId },
      skip,
      take,
      orderBy: {
        uploadedAt: 'desc',
      },
    });
  }
}
