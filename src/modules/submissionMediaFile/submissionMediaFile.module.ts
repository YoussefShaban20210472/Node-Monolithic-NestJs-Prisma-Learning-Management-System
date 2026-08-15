import { Module } from '@nestjs/common';
import { SubmissionMediaFileController } from './submissionMediaFile.controller.js';
import { SubmissionMediaFileRepository } from './submissionMediaFile.repository.js';
import { SubmissionMediaFileService } from './submissionMediaFile.service.js';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module.js';
import { RequestModule } from '../../common/request/request.module.js';

@Module({
  imports: [PrismaModule, RequestModule],
  controllers: [SubmissionMediaFileController],
  providers: [SubmissionMediaFileService, SubmissionMediaFileRepository],
  exports: [SubmissionMediaFileService],
})
export class SubmissionMediaFileModule {}
