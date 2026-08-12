import { Module } from '@nestjs/common';
import { AssignmentMediaFileController } from './assignmentMediaFile.controller.js';
import { AssignmentMediaFileRepository } from './assignmentMediaFile.repository.js';
import { AssignmentMediaFileService } from './assignmentMediaFile.service.js';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module.js';
import { RequestModule } from '../../common/request/request.module.js';

@Module({
  imports: [PrismaModule, RequestModule],
  controllers: [AssignmentMediaFileController],
  providers: [AssignmentMediaFileService, AssignmentMediaFileRepository],
  exports: [AssignmentMediaFileService],
})
export class AssignmentMediaFileModule {}
