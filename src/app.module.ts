import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './modules/user/user.module.js';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './common/filter/prisma-exception.filter.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { CourseModule } from './modules/course/course.module.js';
import { EnrollmentModule } from './modules/enrollment/enrollment.module.js';
import { LessonModule } from './modules/lesson/lesson.module.js';
import { AssignmentModule } from './modules/assignment/assignment.module.js';
import { AttendanceModule } from './modules/attendance/attendance.module.js';
import { CourseMediaFileModule } from './modules/courseMediaFile/courseMediaFile.module.js';
import { AssignmentMediaFileModule } from './modules/assignmentMediaFile/assignmentMediaFile.module.js';
import { SubmissionModule } from './modules/submission/submission.module.js';
import { SubmissionMediaFileModule } from './modules/submissionMediaFile/submissionMediaFile.module.js';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CourseModule,
    EnrollmentModule,
    LessonModule,
    AssignmentModule,
    AttendanceModule,
    CourseMediaFileModule,
    AssignmentMediaFileModule,
    SubmissionModule,
    SubmissionMediaFileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class AppModule {}
