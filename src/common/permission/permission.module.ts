import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service.js';
import { AuthorizationCheckerModule } from '../checker/authorization.checker.module.js';

@Module({
  imports: [AuthorizationCheckerModule],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
