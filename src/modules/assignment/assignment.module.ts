import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller.js';
import { AssignmentRepository } from './assignment.repository.js';
import { AssignmentService } from './assignment.service.js';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module.js';
import { CourseModule } from '../course/course.module.js';

@Module({
  imports: [PrismaModule, CourseModule],
  controllers: [AssignmentController],
  providers: [AssignmentService, AssignmentRepository],
  exports: [AssignmentService],
})
export class AssignmentModule {}
