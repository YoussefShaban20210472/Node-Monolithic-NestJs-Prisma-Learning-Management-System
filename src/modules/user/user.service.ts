import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './user.repository.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(dto: CreateUserDto) {
    return this.usersRepository.create(dto);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findAll(page = 1, limit = 10) {
    return this.usersRepository.findAll((page - 1) * limit, limit);
  }
}
