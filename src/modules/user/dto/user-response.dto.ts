import { UserRole } from '../../../../generated/prisma/enums.js';

export class UserResponseDto {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  phoneNumber!: string;
  address!: string;
  role!: UserRole;
  createdAt!: Date;
  updatedAt!: Date;
}
