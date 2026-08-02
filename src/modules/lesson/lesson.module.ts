import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller.js';
import { LessonRepository } from './lesson.repository.js';
import { LessonService } from './lesson.service.js';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module.js';
import { CourseModule } from '../course/course.module.js';

@Module({
  imports: [PrismaModule, CourseModule],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
  exports: [LessonService],
})
export class LessonModule {}
