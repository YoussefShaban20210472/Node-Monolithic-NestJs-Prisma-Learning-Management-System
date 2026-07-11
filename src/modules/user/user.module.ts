import { Module } from '@nestjs/common';
import { UsersController } from './user.controller.js';
import { UsersRepository } from './user.repository.js';
import { UsersService } from './user.service.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
