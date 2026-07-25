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
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserQueryDto } from './dto/user-query.dto.js';
import { Role } from '../../common/enum/role.enum.js';
import { Roles } from '../../common/decorator/roles.decorator.js';
import type { AuthenticatedRequest } from 'src/common/interface/authenticated-request.interface.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
  @Roles(Role.ADMIN)
  @Get()
  findAll(@Query() query: UserQueryDto) {
    return this.userService.findAll(query.page, query.limit);
  }
  @Get('me')
  findMe(@Req() request: AuthenticatedRequest) {
    return this.userService.findById(request.user.id);
  }
  @Roles(Role.ADMIN)
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }
  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteById(id);
  }
  @Patch('me')
  updateMe(@Req() request: AuthenticatedRequest, @Body() dto: UpdateUserDto) {
    return this.userService.updateById(request.user.id, dto);
  }
  @Roles(Role.ADMIN)
  @Patch(':id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateById(id, dto);
  }
}
