/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service.js';
import { Role } from '../../common/enum/role.enum.js';
import { Roles } from '../../common/decorator/roles.decorator.js';
import type { AuthenticatedRequest } from '../../common/interface/authenticated-request.interface.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { Resource } from '../../common/enum/resource.enum.js';
import { Owner } from '../../common/decorator/owner.decorator.js';
import {
  CreateAttendanceDto,
  CreateAttendanceInputDto,
} from './dto/create-attendance.dto.js';
import { Enrolled } from '../../common/decorator/enrolled.decorator.js';
import { StudentIdDto } from '../../common/dto/studentId.js';

@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}
  @Roles(Role.ADMIN)
  @Post('admin/lessons/:id/attendances')
  createByAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateAttendanceDto,
  ) {
    return this.attendanceService.create(id, dto.studentId, dto.otp);
  }
  @Roles(Role.STUDENT)
  @Enrolled(Resource.LESSON)
  @Post('lessons/:id/attendances')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
    @Body() dto: CreateAttendanceInputDto,
  ) {
    return this.attendanceService.create(id, request.user.id, dto.otp);
  }

  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.LESSON)
  @Get('lessons/:id/attendances/all')
  findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PaginationDto,
  ) {
    return this.attendanceService.findAll(id, query.page, query.limit);
  }

  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.COURSE)
  @Get('lessons/:id/attendances')
  findOne(@Param('id', ParseIntPipe) id: number, @Body() dto: StudentIdDto) {
    return this.attendanceService.findOne(id, dto.studentId);
  }

  @Roles(Role.STUDENT)
  @Enrolled(Resource.LESSON)
  @Get('lessons/:id/attendances/me')
  findOneByStudent(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.attendanceService.findOne(id, request.user.id);
  }
}
