import { Injectable, NotFoundException } from '@nestjs/common';
import { OwnershipChecker } from '../common/interface/ownership-checker.interface.js';
import { Resource } from '../common/enum/resource.enum.js';
import { PrismaService } from '../infrastructure/prisma/prisma.service.js';

@Injectable()
export class CourseChecker implements OwnershipChecker {
  readonly resource = Resource.COURSE;

  constructor(private readonly prisma: PrismaService) {}

  async owns(courseId: number, userId: number): Promise<boolean> {
    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
      },
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course.instructorId === userId;
  }
}
