import { SetMetadata } from '@nestjs/common';
import { Resource } from '../enum/resource.enum.js';

export const OWNER_KEY = 'owner';

export const Owner = (resource: Resource) => SetMetadata(OWNER_KEY, resource);
