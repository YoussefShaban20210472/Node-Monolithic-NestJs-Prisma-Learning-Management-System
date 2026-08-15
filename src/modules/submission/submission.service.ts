/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SubmissionRepository } from './submission.repository.js';

import { AssignmentService } from '../assignment/assignment.service.js';
@Injectable()
export class SubmissionService {
  constructor(
    private readonly submissionRepository: SubmissionRepository,
    private readonly assignmentService: AssignmentService,
  ) {}

  async create(assignmentId: number, studentId: number) {
    await this.assignmentService.findById(assignmentId);

    return this.submissionRepository.create(assignmentId, studentId);
  }
  async deleteById(id: number) {
    const submission = await this.submissionRepository.findById(id);
    if (!submission) {
      throw new NotFoundException('Submission not found');
    }
    if (submission.scoredAt > submission.submittedAt) {
      throw new ConflictException("Can't delete a scored submission");
    }

    return await this.submissionRepository.deleteById(id);
  }
  async findById(id: number) {
    const submission = await this.submissionRepository.findById(id);

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    return submission;
  }
  async findAll(assignmentId: number, page = 1, limit = 10) {
    await this.assignmentService.findById(assignmentId);
    return this.submissionRepository.findAll((page - 1) * limit, limit);
  }
  async updateById(id: number, score: number) {
    const submission = await this.submissionRepository.updateById(id, score);
    return submission;
  }
}
