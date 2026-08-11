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
import { CourseMediaFileService } from './courseMediaFile.service.js';

import { Role } from '../../common/enum/role.enum.js';
import { Roles } from '../../common/decorator/roles.decorator.js';
import { Owner } from '../../common/decorator/owner.decorator.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { Resource } from '../../common/enum/resource.enum.js';
import { CourseMediaFileDto } from './dto/create-courseMediaFile.dto.js';
import {
  FileConfirmOperation,
  FileOperation,
} from '../../common/enum/fileOperation.enum.js';
import { Enrolled } from '../../common/decorator/enrolled.decorator.js';
@Controller('courses')
export class CourseMediaFileController {
  constructor(private readonly courseService: CourseMediaFileService) {}
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.COURSE)
  @Post(':id/mediaFiles/:type')
  createSignedUrl(
    @Param('type', new ParseEnumPipe(FileOperation))
    type: FileOperation,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CourseMediaFileDto,
  ) {
    return this.courseService.createSignedUrl(id, dto, type);
  }

  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.COURSE)
  @Post(':id/mediaFiles/:type/confirm')
  confirmSignedUrl(
    @Param('type', new ParseEnumPipe(FileConfirmOperation))
    type: FileConfirmOperation,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CourseMediaFileDto,
  ) {
    return this.courseService.confirmSignedUrl(id, dto, type);
  }
  @Enrolled(Resource.COURSE)
  @Owner(Resource.COURSE)
  @Get(':id/mediaFiles')
  findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PaginationDto,
  ) {
    return this.courseService.findAll(id, query.page, query.limit);
  }
}
