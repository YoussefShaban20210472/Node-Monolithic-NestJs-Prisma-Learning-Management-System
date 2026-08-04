/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository.js';
import { LessonService } from '../lesson/lesson.service.js';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository,
    private readonly lessonService: LessonService,
  ) {}

  async create(lessonId: number, studentId: number, otp: string) {
    const lesson = await this.lessonService.findOtpById(lessonId);
    if (lesson.otp !== otp) {
      throw new BadRequestException('Lesson OTP is wrong');
    }
    return this.attendanceRepository.create(lessonId, studentId);
  }

  async findOne(lessonId: number, studentId: number) {
    await this.lessonService.findById(lessonId);
    const attendance = await this.attendanceRepository.findOne(
      lessonId,
      studentId,
    );

    if (!attendance) {
      throw new NotFoundException('Attendance not found');
    }

    return attendance;
  }

  async findAll(lessonId: number, page = 1, limit = 10) {
    await this.lessonService.findById(lessonId);
    return this.attendanceRepository.findAll(
      lessonId,
      (page - 1) * limit,
      limit,
    );
  }
}
