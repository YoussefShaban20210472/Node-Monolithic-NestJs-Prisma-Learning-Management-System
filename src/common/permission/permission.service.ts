import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CourseChecker } from '../../checker/course.checker.js';
import { Resource } from '../enum/resource.enum.js';
import { OwnershipChecker } from '../interface/ownership-checker.interface.js';

@Injectable()
export class PermissionService {
  private readonly checkers = new Map<Resource, OwnershipChecker>();

  constructor(courseChecker: CourseChecker) {
    this.checkers.set(courseChecker.resource, courseChecker);
  }

  async owns(
    resource: Resource,
    resourceId: number,
    userId: number,
  ): Promise<boolean> {
    const checker = this.checkers.get(resource);

    if (!checker) {
      throw new InternalServerErrorException(`No checker for ${resource}`);
    }

    return checker.owns(resourceId, userId);
  }
}
