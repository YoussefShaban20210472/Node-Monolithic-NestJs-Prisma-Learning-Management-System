import { Module } from '@nestjs/common';
import { CourseMediaFileController } from './courseMediaFile.controller.js';
import { CourseMediaFileRepository } from './courseMediaFile.repository.js';
import { CourseMediaFileService } from './courseMediaFile.service.js';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module.js';
import { RequestModule } from '../../common/request/request.module.js';

@Module({
  imports: [PrismaModule, RequestModule],
  controllers: [CourseMediaFileController],
  providers: [CourseMediaFileService, CourseMediaFileRepository],
  exports: [CourseMediaFileService],
})
export class CourseMediaFileModule {}
