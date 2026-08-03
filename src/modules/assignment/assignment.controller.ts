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
import { AssignmentService } from './assignment.service.js';
import { CreateAssignmentInputDto } from './dto/create-assignment.dto.js';
import { Role } from '../../common/enum/role.enum.js';
import { Roles } from '../../common/decorator/roles.decorator.js';
import { Owner } from '../../common/decorator/owner.decorator.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
import { UpdateAssignmentDto } from './dto/update-assignment.dto.js';
import { Resource } from '../../common/enum/resource.enum.js';
import { Enrolled } from '../../common/decorator/enrolled.decorator.js';
@Controller()
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.COURSE)
  @Post('courses/:id/assignments')
  create(
    @Body() dto: CreateAssignmentInputDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.assignmentService.create(id, dto);
  }
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.ASSIGNMENT)
  @Delete('assignments/:id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentService.deleteById(id);
  }
  @Enrolled(Resource.ASSIGNMENT)
  @Owner(Resource.ASSIGNMENT)
  @Get('assignments/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentService.findById(id);
  }
  @Enrolled(Resource.COURSE)
  @Owner(Resource.COURSE)
  @Get('courses/:id/assignments')
  findAll(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PaginationDto,
  ) {
    return this.assignmentService.findAll(id, query.page, query.limit);
  }
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Owner(Resource.ASSIGNMENT)
  @Patch('assignments/:id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAssignmentDto,
  ) {
    return this.assignmentService.updateById(id, dto);
  }
}
