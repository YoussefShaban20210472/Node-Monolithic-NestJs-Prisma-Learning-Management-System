/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LessonService } from './lesson.service.js';
import { CreateLessonInputDto } from './dto/create-lesson.dto.js';
import { Role } from '../../common/enum/role.enum.js';
import { Roles } from '../../common/decorator/roles.decorator.js';
import { Owner } from '../../common/decorator/owner.decorator.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { UpdateLessonDto } from './dto/update-lesson.dto.js';
import { Resource } from '../../common/enum/resource.enum.js';
import { Enrolled } from '../../common/decorator/enrolled.decorator.js';
@Controller()
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.COURSE)
  @Post('courses/:id/lessons')
  create(
    @Body() dto: CreateLessonInputDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.lessonService.create(id, dto);
  }
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.LESSON)
  @Delete('lessons/:id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.lessonService.deleteById(id);
  }
  @Enrolled(Resource.LESSON)
  @Owner(Resource.LESSON)
  @Get('lessons/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.lessonService.findById(id);
  }
  @Enrolled(Resource.COURSE)
  @Owner(Resource.COURSE)
  @Get('courses/:id/lessons')
  findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PaginationDto,
  ) {
    return this.lessonService.findAll(id, query.page, query.limit);
  }
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.LESSON)
  @Patch('lessons/:id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLessonDto,
  ) {
    return this.lessonService.updateById(id, dto);
  }
}
