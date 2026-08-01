import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EnrollmentRepository } from './enrollment.repository.js';
import { EnrollmentStatus } from '../../../generated/prisma/enums.js';

@Injectable()
export class EnrollmentService {
  constructor(private readonly enrollmentRepository: EnrollmentRepository) {}

  async create(courseId: number, studentId: number) {
    return this.enrollmentRepository.create(courseId, studentId);
  }

  async findOne(courseId: number, studentId: number) {
    const enrollment = await this.enrollmentRepository.findOne(
      courseId,
      studentId,
    );

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    return enrollment;
  }

  findAll(page = 1, limit = 10) {
    return this.enrollmentRepository.findAll((page - 1) * limit, limit);
  }
  async deleteOne(courseId: number, studentId: number) {
    const enrollment = await this.enrollmentRepository.findOne(
      courseId,
      studentId,
    );
    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }
    if (enrollment.status !== EnrollmentStatus.PENDING) {
      throw new ConflictException('Only pending enrollments can be canceled');
    }
    return enrollment;
  }

  async updateOne(
    courseId: number,
    studentId: number,
    status: EnrollmentStatus,
  ) {
    const enrollment = await this.enrollmentRepository.updateOne(
      courseId,
      studentId,
      status,
    );

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    return enrollment;
  }
}
