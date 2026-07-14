import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module.js';
import { HashModule } from '../../common/hash/hash.module.js';

@Module({
  imports: [PrismaModule, HashModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
