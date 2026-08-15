import { Module } from '@nestjs/common';
import { SubmissionController } from './submission.controller.js';
import { SubmissionRepository } from './submission.repository.js';
import { SubmissionService } from './submission.service.js';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module.js';
import { AssignmentModule } from '../assignment/assignment.module.js';

@Module({
  imports: [PrismaModule, AssignmentModule],
  controllers: [SubmissionController],
  providers: [SubmissionService, SubmissionRepository],
  exports: [SubmissionService],
})
export class SubmissionModule {}
