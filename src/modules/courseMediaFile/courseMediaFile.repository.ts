import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';

@Injectable()
export class CourseMediaFileRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(courseId: number, file: string, path: string) {
    return this.prisma.courseMediaFile.create({
      data: {
        course: {
          connect: { id: courseId },
        },
        file,
        path,
      },
    });
  }
  deleteByPath(path: string) {
    return this.prisma.courseMediaFile.delete({
      where: { path },
    });
  }
  findByPath(path: string) {
    return this.prisma.courseMediaFile.findUnique({
      where: { path },
    });
  }
  findAll(courseId: number, skip = 0, take = 10) {
    return this.prisma.courseMediaFile.findMany({
      where: { courseId },
      skip,
      take,
      orderBy: {
        uploadedAt: 'desc',
      },
    });
  }
}
