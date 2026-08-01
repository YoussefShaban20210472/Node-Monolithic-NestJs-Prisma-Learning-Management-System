import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller.js';
import { EnrollmentRepository } from './enrollment.repository.js';
import { EnrollmentService } from './enrollment.service.js';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService, EnrollmentRepository],
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
