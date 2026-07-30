import { RoleType } from './role-type.js';

export type HttpRequestOptionsType = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  getUrl: () => string;
  getBody: () => object;
  roles?: RoleType[];
  getDescribeString?: (role: string) => string;
};
