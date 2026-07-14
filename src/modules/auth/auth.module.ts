import { Module } from '@nestjs/common';
import { RedisModule } from '../../infrastructure/redis/redis.module.js';
import { HashModule } from '../../common/hash/hash.module.js';
import { JwtModule } from '@nestjs/jwt';
import config from '../../config/index.js';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guard/roles.guard.js';

const JWTModule = JwtModule.register({
  secret: config.jwtSecret,
  signOptions: {
    expiresIn: config.jwtExpiresIn,
  },
});
@Module({
  imports: [RedisModule, UserModule, HashModule, JWTModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAuthGuard,
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
