/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';

import { CreateAssignmentDto } from './dto/create-assignment.dto.js';
import { UpdateAssignmentDto } from './dto/update-assignment.dto.js';

@Injectable()
export class AssignmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateAssignmentDto) {
    return this.prisma.assignment.create({
      data: {
        title: data.title,
        description: data.description,
        score: data.score,
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
    return this.prisma.assignment.delete({
      where: { id },
    });
  }
  findById(id: number) {
    return this.prisma.assignment.findUnique({
      where: { id },
    });
  }
  findAll(skip = 0, take = 10) {
    return this.prisma.assignment.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  updateById(id: number, dto: UpdateAssignmentDto) {
    return this.prisma.assignment.update({
      where: { id },
      data: dto,
    });
  }
}
