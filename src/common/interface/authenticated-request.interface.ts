import type { Request } from 'express';
import { Role } from '../enum/role.enum.js';

export interface JwtPayload {
  id: number;
  jwtVersion: string;
  role: Role;
}

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
