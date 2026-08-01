import { Module } from '@nestjs/common';
import { CourseChecker } from './course.checker.js';

@Module({
  providers: [CourseChecker],
  exports: [CourseChecker],
})
export class OwnershipCheckerModule {}
