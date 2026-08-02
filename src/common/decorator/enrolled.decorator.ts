import { SetMetadata } from '@nestjs/common';
import { Resource } from '../enum/resource.enum.js';

export const Enrolled_KEY = 'enrolled';

export const Enrolled = (resource: Resource) =>
  SetMetadata(Enrolled_KEY, resource);
