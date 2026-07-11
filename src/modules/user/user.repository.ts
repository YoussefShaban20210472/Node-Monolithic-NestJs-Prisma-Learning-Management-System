import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

import type {
  UserCreateInput,
  UserUpdateInput,
} from '../../../generated/prisma/models/User.js';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: UserCreateInput) {
    return this.prisma.user.create({
      data,
      omit: {
        password: true,
      },
    });
  }

  findAll(skip = 0, take = 10) {
    return this.prisma.user.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findByPhoneNumber(phoneNumber: string) {
    return this.prisma.user.findUnique({
      where: { phoneNumber },
    });
  }

  update(id: number, data: UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  count() {
    return this.prisma.user.count();
  }
}
