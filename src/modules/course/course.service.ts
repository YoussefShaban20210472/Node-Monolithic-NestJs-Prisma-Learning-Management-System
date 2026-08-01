/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CourseRepository } from './course.repository.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { assertDuration } from '../../validator/date.validator.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  create(dto: CreateCourseDto) {
    assertDuration(dto.startDate, dto.endDate, 'days');
    return this.courseRepository.create(dto);
  }
  async deleteById(id: number) {
    const course = await this.courseRepository.deleteById(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }
  async findById(id: number) {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }
  findAll(page = 1, limit = 10) {
    return this.courseRepository.findAll((page - 1) * limit, limit);
  }
  async updateById(id: number, dto: UpdateCourseDto) {
    const isEmpty = Object.values(dto).every((value) => value === undefined);
    if (isEmpty) {
      throw new BadRequestException(
        'At least one field must be provided to update course',
      );
    }
    const existedCourse = await this.courseRepository.findById(id);
    if (!existedCourse) {
      throw new NotFoundException('Course not found');
    }
    let start = existedCourse.startDate.toUTCString();
    let end = existedCourse.endDate.toUTCString();
    if (dto.startDate !== undefined) {
      start = dto.startDate;
    }
    if (dto.endDate !== undefined) {
      end = dto.endDate;
    }
    assertDuration(start, end, 'days');
    const course = await this.courseRepository.updateById(id, dto);

    return course;
  }
}
