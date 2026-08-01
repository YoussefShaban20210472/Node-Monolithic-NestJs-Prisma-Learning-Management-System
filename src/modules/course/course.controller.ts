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
  Req,
} from '@nestjs/common';
import { CourseService } from './course.service.js';
import {
  CreateCourseByInstructorDto,
  CreateCourseDto,
} from './dto/create-course.dto.js';
import { Role } from '../../common/enum/role.enum.js';
import { Roles } from '../../common/decorator/roles.decorator.js';
import { Owner } from '../../common/decorator/owner.decorator.js';
import type { AuthenticatedRequest } from '../../common/interface/authenticated-request.interface.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { Resource } from '../../common/enum/resource.enum.js';
@Controller()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Roles(Role.ADMIN)
  @Post('admin/courses')
  createByAdmin(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }
  @Roles(Role.INSTRUCTOR)
  @Post('courses')
  createByInstructor(
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateCourseByInstructorDto,
  ) {
    return this.courseService.create({ ...dto, instructorId: request.user.id });
  }
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.COURSE)
  @Delete('courses/:id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.deleteById(id);
  }
  @Owner(Resource.COURSE)
  @Get('courses/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findById(id);
  }
  @Get('courses')
  findAll(@Query() query: PaginationDto) {
    return this.courseService.findAll(query.page, query.limit);
  }
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.COURSE)
  @Patch('courses/:id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.courseService.updateById(id, dto);
  }
}
