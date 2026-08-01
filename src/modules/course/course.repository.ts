/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { CourseUpdateInput } from '../../../generated/prisma/models.js';

@Injectable()
export class CourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        shortDescription: data.shortDescription,
        startDate: data.startDate,
        endDate: data.endDate,

        instructor: {
          connect: { id: data.instructorId },
        },

        tags: {
          connectOrCreate: data.tags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },

        categories: {
          connectOrCreate: data.categories.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    });
  }
  deleteById(id: number) {
    return this.prisma.course.delete({
      where: { id },
    });
  }
  findById(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }
  findAll(skip = 0, take = 10) {
    return this.prisma.course.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  updateById(id: number, dto: UpdateCourseDto) {
    const data: CourseUpdateInput = {};

    if (dto.title !== undefined) {
      data.title = dto.title;
    }

    if (dto.description !== undefined) {
      data.description = dto.description;
    }

    if (dto.shortDescription !== undefined) {
      data.shortDescription = dto.shortDescription;
    }

    if (dto.startDate !== undefined) {
      data.startDate = new Date(dto.startDate);
    }

    if (dto.endDate !== undefined) {
      data.endDate = new Date(dto.endDate);
    }

    if (dto.tags !== undefined) {
      data.tags = {
        set: [],
        connectOrCreate: dto.tags.map((name) => ({
          where: { name },
          create: { name },
        })),
      };
    }

    if (dto.categories !== undefined) {
      data.categories = {
        set: [],
        connectOrCreate: dto.categories.map((name) => ({
          where: { name },
          create: { name },
        })),
      };
    }

    return this.prisma.course.update({
      where: { id },
      data,
    });
  }
}
