import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionService } from '../permission/permission.service.js';
import { Resource } from '../enum/resource.enum.js';
import { Enrolled_KEY } from '../decorator/enrolled.decorator.js';
import { AuthenticatedRequest } from '../interface/authenticated-request.interface.js';
import { Role } from '../enum/role.enum.js';

@Injectable()
export class StudentEnrolledGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissions: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const resource = this.reflector.get<Resource>(
      Enrolled_KEY,
      context.getHandler(),
    );

    if (!resource) {
      return true;
    }

    const request: AuthenticatedRequest = context.switchToHttp().getRequest();
    if (request.user.role !== Role.STUDENT) {
      return true;
    }
    const resourceId = Number(request.params[`id`]);

    const owns = await this.permissions.enrolls(
      resource,
      resourceId,
      request.user.id,
    );

    if (!owns) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
