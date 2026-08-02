/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';

import { CreateLessonDto } from './dto/create-lesson.dto.js';
import { UpdateLessonDto } from './dto/update-lesson.dto.js';

@Injectable()
export class LessonRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateLessonDto) {
    return this.prisma.lesson.create({
      data: {
        title: data.title,
        description: data.description,
        otp: data.otp,
        startDate: data.startDate,
        endDate: data.endDate,

        instructor: {
          connect: { id: data.instructorId },
        },
        course: {
          connect: { id: data.courseId },
        },
      },
    });
  }

  deleteById(id: number) {
    return this.prisma.lesson.delete({
      where: { id },
    });
  }
  findById(id: number) {
    return this.prisma.lesson.findUnique({
      where: { id },
    });
  }
  findAll(skip = 0, take = 10) {
    return this.prisma.lesson.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  updateById(id: number, dto: UpdateLessonDto) {
    return this.prisma.lesson.update({
      where: { id },
      data: dto,
    });
  }
}
