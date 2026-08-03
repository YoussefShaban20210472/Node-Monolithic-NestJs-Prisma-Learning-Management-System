import { Module } from '@nestjs/common';
import { CourseChecker } from './course.checker.js';
import { LessonChecker } from './lesson.checker.js';
import { AssignmentChecker } from './assignment.checker.js';

@Module({
  providers: [CourseChecker, LessonChecker, AssignmentChecker],
  exports: [CourseChecker, LessonChecker, AssignmentChecker],
})
export class AuthorizationCheckerModule {}
