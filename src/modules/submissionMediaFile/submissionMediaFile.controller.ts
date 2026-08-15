/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { SubmissionMediaFileService } from './submissionMediaFile.service.js';

import { Role } from '../../common/enum/role.enum.js';
import { Roles } from '../../common/decorator/roles.decorator.js';
import { Owner } from '../../common/decorator/owner.decorator.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { Resource } from '../../common/enum/resource.enum.js';
import {
  FileConfirmOperation,
  FileOperation,
} from '../../common/enum/fileOperation.enum.js';
import { Enrolled } from '../../common/decorator/enrolled.decorator.js';
import { MediaFileDto } from '../../common/dto/mediaFile.dto.js';
@Controller('submissions')
export class SubmissionMediaFileController {
  constructor(
    private readonly submissionMediaFileService: SubmissionMediaFileService,
  ) {}
  @Roles(Role.ADMIN, Role.STUDENT)
  @Enrolled(Resource.Submission)
  @Post(':id/mediaFiles/:type')
  createSignedUrl(
    @Param('type', new ParseEnumPipe(FileOperation))
    type: FileOperation,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MediaFileDto,
  ) {
    return this.submissionMediaFileService.createSignedUrl(id, dto, type);
  }

  @Roles(Role.ADMIN, Role.STUDENT)
  @Enrolled(Resource.Submission)
  @Post(':id/mediaFiles/:type/confirm')
  confirmSignedUrl(
    @Param('type', new ParseEnumPipe(FileConfirmOperation))
    type: FileConfirmOperation,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MediaFileDto,
  ) {
    return this.submissionMediaFileService.confirmSignedUrl(id, dto, type);
  }
  @Enrolled(Resource.Submission)
  @Owner(Resource.Submission)
  @Get(':id/mediaFiles')
  findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PaginationDto,
  ) {
    return this.submissionMediaFileService.findAll(id, query.page, query.limit);
  }
}
