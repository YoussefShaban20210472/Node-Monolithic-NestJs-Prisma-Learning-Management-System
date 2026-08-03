import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CourseChecker } from '../checker/course.checker.js';
import { Resource } from '../enum/resource.enum.js';
import { AuthorizationChecker } from '../interface/authorization-checker.interface.js';
import { LessonChecker } from '../checker/lesson.checker.js';
import { AssignmentChecker } from '../checker/assignment.checker.js';

@Injectable()
export class PermissionService {
  private readonly checkers = new Map<Resource, AuthorizationChecker>();

  constructor(
    courseChecker: CourseChecker,
    lessonChecker: LessonChecker,
    assignmentChecker: AssignmentChecker,
  ) {
    this.checkers.set(courseChecker.resource, courseChecker);
    this.checkers.set(lessonChecker.resource, lessonChecker);
    this.checkers.set(assignmentChecker.resource, assignmentChecker);
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
  async enrolls(
    resource: Resource,
    resourceId: number,
    userId: number,
  ): Promise<boolean> {
    const checker = this.checkers.get(resource);

    if (!checker) {
      throw new InternalServerErrorException(`No checker for ${resource}`);
    }

    return checker.enrolls(resourceId, userId);
  }
}
