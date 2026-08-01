import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service.js';
import { OwnershipCheckerModule } from '../../checker/ownership.checker.module.js';

@Module({
  imports: [OwnershipCheckerModule],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
