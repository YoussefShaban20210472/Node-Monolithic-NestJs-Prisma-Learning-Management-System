import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './modules/user/user.module.js';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './common/filter/prisma-exception.filter.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { CourseModule } from './modules/course/course.module.js';
import { EnrollmentModule } from './modules/enrollment/enrollment.module.js';

@Module({
  imports: [UserModule, AuthModule, CourseModule, EnrollmentModule],
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
