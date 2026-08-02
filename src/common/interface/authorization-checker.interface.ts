import { Resource } from '../enum/resource.enum.js';

export interface AuthorizationChecker {
  readonly resource: Resource;

  owns(resourceId: number, userId: number): Promise<boolean>;
  enrolls(resourceId: number, userId: number): Promise<boolean>;
}
