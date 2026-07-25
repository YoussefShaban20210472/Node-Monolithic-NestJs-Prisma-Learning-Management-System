import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';

import type {
  UserCreateInput,
  UserUpdateInput,
} from '../../../generated/prisma/models/User.js';

const omit = {
  password: true,
};
@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: UserCreateInput) {
    return this.prisma.user.create({
      data,
      omit,
    });
  }

  findAll(skip = 0, take = 10) {
    return this.prisma.user.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      omit,
    });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      omit,
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      // omit,
    });
  }

  findByPhoneNumber(phoneNumber: string) {
    return this.prisma.user.findUnique({
      where: { phoneNumber },
      omit,
    });
  }

  updateById(id: number, data: UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
      omit,
    });
  }

  deleteById(id: number) {
    return this.prisma.user.delete({
      where: { id },
      omit,
    });
  }

  count() {
    return this.prisma.user.count();
  }
}
