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
import { AssignmentMediaFileService } from './assignmentMediaFile.service.js';

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
@Controller('assignments')
export class AssignmentMediaFileController {
  constructor(
    private readonly assignmentMediaFileService: AssignmentMediaFileService,
  ) {}
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.ASSIGNMENT)
  @Post(':id/mediaFiles/:type')
  createSignedUrl(
    @Param('type', new ParseEnumPipe(FileOperation))
    type: FileOperation,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MediaFileDto,
  ) {
    return this.assignmentMediaFileService.createSignedUrl(id, dto, type);
  }

  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.ASSIGNMENT)
  @Post(':id/mediaFiles/:type/confirm')
  confirmSignedUrl(
    @Param('type', new ParseEnumPipe(FileConfirmOperation))
    type: FileConfirmOperation,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MediaFileDto,
  ) {
    return this.assignmentMediaFileService.confirmSignedUrl(id, dto, type);
  }
  @Enrolled(Resource.ASSIGNMENT)
  @Owner(Resource.ASSIGNMENT)
  @Get(':id/mediaFiles')
  findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PaginationDto,
  ) {
    return this.assignmentMediaFileService.findAll(id, query.page, query.limit);
  }
}
