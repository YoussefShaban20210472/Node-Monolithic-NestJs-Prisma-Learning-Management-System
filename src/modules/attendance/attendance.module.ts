import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller.js';
import { AttendanceRepository } from './attendance.repository.js';
import { AttendanceService } from './attendance.service.js';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module.js';
import { LessonModule } from '../lesson/lesson.module.js';

@Module({
  imports: [PrismaModule, LessonModule],
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendanceRepository],
  exports: [AttendanceService],
})
export class AttendanceModule {}
