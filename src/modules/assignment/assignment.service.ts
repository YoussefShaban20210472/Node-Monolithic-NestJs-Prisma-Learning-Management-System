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
import { AssignmentRepository } from './assignment.repository.js';
import {
  CreateAssignmentDto,
  CreateAssignmentInputDto,
} from './dto/create-assignment.dto.js';
import { assertValidTimeAndDuration } from '../../validator/date.validator.js';
import { UpdateAssignmentDto } from './dto/update-assignment.dto.js';
import { CourseService } from '../course/course.service.js';
@Injectable()
export class AssignmentService {
  constructor(
    private readonly assignmentRepository: AssignmentRepository,
    private readonly courseService: CourseService,
  ) {}

  async create(courseId: number, dto: CreateAssignmentInputDto) {
    const course = await this.courseService.findById(courseId);

    const data: CreateAssignmentDto = {
      ...dto,
      courseId: course.id,
      instructorId: course.instructorId,
    };
    assertValidTimeAndDuration(
      course,
      { startDate: dto.startDate, endDate: dto.endDate },
      'Assignment',
    );
    return this.assignmentRepository.create(data);
  }
  async deleteById(id: number) {
    const assignment = await this.assignmentRepository.deleteById(id);

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    return assignment;
  }
  async findById(id: number) {
    const assignment = await this.assignmentRepository.findById(id);

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    return assignment;
  }
  async findAll(courseId: number, page = 1, limit = 10) {
    await this.courseService.findById(courseId);
    return this.assignmentRepository.findAll((page - 1) * limit, limit);
  }
  async updateById(id: number, dto: UpdateAssignmentDto) {
    const isEmpty = Object.values(dto).every((value) => value === undefined);
    if (isEmpty) {
      throw new BadRequestException(
        'At least one field must be provided to update assignment',
      );
    }
    const existedAssignment = await this.assignmentRepository.findById(id);
    if (!existedAssignment) {
      throw new NotFoundException('Assignment not found');
    }
    let start = existedAssignment.startDate.toUTCString();
    let end = existedAssignment.endDate.toUTCString();
    if (dto.startDate !== undefined) {
      start = dto.startDate;
    }
    if (dto.endDate !== undefined) {
      end = dto.endDate;
    }
    const course = await this.courseService.findById(
      existedAssignment.courseId,
    );
    assertValidTimeAndDuration(
      course,
      { startDate: start, endDate: end },
      'Assignment',
    );
    const assignment = await this.assignmentRepository.updateById(id, dto);

    return assignment;
  }
}
