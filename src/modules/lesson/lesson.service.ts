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
import { LessonRepository } from './lesson.repository.js';
import {
  CreateLessonDto,
  CreateLessonInputDto,
} from './dto/create-lesson.dto.js';
import { assertValidTimeAndDuration } from '../../validator/date.validator.js';
import { UpdateLessonDto } from './dto/update-lesson.dto.js';
import { generateOTP } from '../../common/utils/otp.js';
import { CourseService } from '../course/course.service.js';
@Injectable()
export class LessonService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly courseService: CourseService,
  ) {}

  async create(courseId: number, dto: CreateLessonInputDto) {
    const otp = generateOTP();
    const course = await this.courseService.findById(courseId);

    const data: CreateLessonDto = {
      ...dto,
      otp,
      courseId: course.id,
      instructorId: course.instructorId,
    };

    assertValidTimeAndDuration(
      course,
      { startDate: dto.startDate, endDate: dto.endDate },
      'Lesson',
    );
    return this.lessonRepository.create(data);
  }
  async deleteById(id: number) {
    const lesson = await this.lessonRepository.deleteById(id);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return lesson;
  }
  async findById(id: number) {
    const lesson = await this.lessonRepository.findById(id);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return lesson;
  }
  async findAll(courseId: number, page = 1, limit = 10) {
    await this.courseService.findById(courseId);
    return this.lessonRepository.findAll((page - 1) * limit, limit);
  }
  async updateById(id: number, dto: UpdateLessonDto) {
    const isEmpty = Object.values(dto).every((value) => value === undefined);
    if (isEmpty) {
      throw new BadRequestException(
        'At least one field must be provided to update lesson',
      );
    }
    const existedLesson = await this.lessonRepository.findById(id);
    if (!existedLesson) {
      throw new NotFoundException('Lesson not found');
    }
    let start = existedLesson.startDate.toUTCString();
    let end = existedLesson.endDate.toUTCString();
    if (dto.startDate !== undefined) {
      start = dto.startDate;
    }
    if (dto.endDate !== undefined) {
      end = dto.endDate;
    }
    const course = await this.courseService.findById(existedLesson.courseId);
    assertValidTimeAndDuration(
      course,
      { startDate: start, endDate: end },
      'Lesson',
    );
    const lesson = await this.lessonRepository.updateById(id, dto);

    return lesson;
  }
}
