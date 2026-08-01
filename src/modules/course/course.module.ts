import { Module } from '@nestjs/common';
import { CourseController } from './course.controller.js';
import { CourseRepository } from './course.repository.js';
import { CourseService } from './course.service.js';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
  exports: [CourseService],
})
export class CourseModule {}
