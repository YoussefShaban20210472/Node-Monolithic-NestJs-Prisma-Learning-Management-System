import { Module } from '@nestjs/common';
import { CourseChecker } from './course.checker.js';
import { LessonChecker } from './lesson.checker.js';

@Module({
  providers: [CourseChecker, LessonChecker],
  exports: [CourseChecker, LessonChecker],
})
export class AuthorizationCheckerModule {}
