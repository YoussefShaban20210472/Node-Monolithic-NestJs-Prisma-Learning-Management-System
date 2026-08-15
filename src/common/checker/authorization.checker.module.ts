import { Module } from '@nestjs/common';
import { CourseChecker } from './course.checker.js';
import { LessonChecker } from './lesson.checker.js';
import { AssignmentChecker } from './assignment.checker.js';
import { SubmissionChecker } from './submission.checker.js';

const checkers = [
  CourseChecker,
  LessonChecker,
  AssignmentChecker,
  SubmissionChecker,
];
@Module({
  providers: checkers,
  exports: checkers,
})
export class AuthorizationCheckerModule {}
