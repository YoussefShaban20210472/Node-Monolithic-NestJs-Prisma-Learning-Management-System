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
import { SubmissionService } from './submission.service.js';
import { Role } from '../../common/enum/role.enum.js';
import { Roles } from '../../common/decorator/roles.decorator.js';
import { Owner } from '../../common/decorator/owner.decorator.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { Resource } from '../../common/enum/resource.enum.js';
import { Enrolled } from '../../common/decorator/enrolled.decorator.js';
import { StudentIdDto } from '../../common/dto/studentId.js';
import type { AuthenticatedRequest } from '../../common/interface/authenticated-request.interface.js';
import { UpdateSubmissionDto } from './dto/update-submission.dto.js';

@Controller()
export class SubmissionController {
  constructor(private readonly assignmentService: SubmissionService) {}
  @Roles(Role.ADMIN)
  @Post('admin/assignments/:id/submissions')
  createByAdmin(
    @Body() dto: StudentIdDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.assignmentService.create(id, dto.studentId);
  }
  @Roles(Role.STUDENT)
  @Enrolled(Resource.ASSIGNMENT)
  @Post('assignments/:id/submissions')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.assignmentService.create(id, request.user.id);
  }
  @Roles(Role.ADMIN, Role.STUDENT)
  @Enrolled(Resource.Submission)
  @Delete('submissions/:id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentService.deleteById(id);
  }
  @Enrolled(Resource.Submission)
  @Owner(Resource.Submission)
  @Get('submissions/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentService.findById(id);
  }
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.ASSIGNMENT)
  @Get('assignments/:id/submissions')
  findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PaginationDto,
  ) {
    return this.assignmentService.findAll(id, query.page, query.limit);
  }
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.Submission)
  @Patch('submissions/:id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSubmissionDto,
  ) {
    return this.assignmentService.updateById(id, dto.score);
  }
}
