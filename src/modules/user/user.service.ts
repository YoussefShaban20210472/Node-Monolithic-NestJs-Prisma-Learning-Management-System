import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { HashService } from '../../common/hash/hash.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = dto;

    const hashedPassword = await this.hashService.hash(user.password);
    user.password = hashedPassword;

    return this.userRepository.create(user);
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findAll(page = 1, limit = 10) {
    return this.userRepository.findAll((page - 1) * limit, limit);
  }
  async deleteById(id: number) {
    const user = await this.userRepository.deleteById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  async updateById(id: number, dto: UpdateUserDto) {
    const isEmpty = Object.values(dto).every((value) => value === undefined);
    if (isEmpty) {
      throw new BadRequestException(
        'At least one field must be provided to update user',
      );
    }
    const user = await this.userRepository.updateById(id, dto);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
