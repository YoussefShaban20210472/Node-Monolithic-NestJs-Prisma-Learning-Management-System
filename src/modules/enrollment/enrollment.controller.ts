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
import { EnrollmentService } from './enrollment.service.js';
import { Role } from '../../common/enum/role.enum.js';
import { Roles } from '../../common/decorator/roles.decorator.js';
import type { AuthenticatedRequest } from '../../common/interface/authenticated-request.interface.js';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { Resource } from '../../common/enum/resource.enum.js';
import { Owner } from '../../common/decorator/owner.decorator.js';
import { StudentIdDto } from '../../common/dto/studentId.js';

@Controller()
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}
  @Roles(Role.ADMIN)
  @Post('admin/courses/:id/enrollments')
  createByAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: StudentIdDto,
  ) {
    return this.enrollmentService.create(id, dto.studentId);
  }

  @Roles(Role.STUDENT)
  @Post('courses/:id/enrollments')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.enrollmentService.create(id, request.user.id);
  }

  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.COURSE)
  @Get('courses/:id/enrollments/all')
  findAll(@Query() query: PaginationDto) {
    return this.enrollmentService.findAll(query.page, query.limit);
  }

  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.COURSE)
  @Get('courses/:id/enrollments')
  findOne(@Param('id', ParseIntPipe) id: number, @Body() dto: StudentIdDto) {
    return this.enrollmentService.findOne(id, dto.studentId);
  }

  @Roles(Role.STUDENT)
  @Get('courses/:id/enrollments/me')
  findOneByStudent(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.enrollmentService.findOne(id, request.user.id);
  }

  @Roles(Role.ADMIN)
  @Delete('admin/courses/:id/enrollments')
  deleteByAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: StudentIdDto,
  ) {
    return this.enrollmentService.deleteOne(id, dto.studentId);
  }

  @Roles(Role.STUDENT)
  @Delete('courses/:id/enrollments/me')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.enrollmentService.deleteOne(id, request.user.id);
  }
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.COURSE)
  @Patch('courses/:id/enrollments')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentService.updateOne(id, dto.studentId, dto.status);
  }
}
