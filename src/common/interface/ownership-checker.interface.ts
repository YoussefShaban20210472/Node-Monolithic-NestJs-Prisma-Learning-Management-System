import { Resource } from '../enum/resource.enum.js';

export interface OwnershipChecker {
  readonly resource: Resource;

  owns(resourceId: number, userId: number): Promise<boolean>;
}
