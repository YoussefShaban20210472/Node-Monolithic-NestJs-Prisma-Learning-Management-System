import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';
import { UserService } from '../user/user.service.js';
import { HashService } from '../../common/hash/hash.service.js';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../../infrastructure/redis/redis.service.js';
import { JwtPayload } from '../../common/interface/authenticated-request.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    const compare = await this.hashService.compare(dto.password, user.password);
    if (!compare) {
      throw new NotFoundException('User not found');
    }
    const oldJwtVersion =
      (await this.redisService.get(`JWT:${user.id}`)) || '0';
    const payload = {
      id: user.id,
      role: user.role,
      jwtVersion: oldJwtVersion,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
  private async assertJwtVersion(payload: JwtPayload) {
    const oldJwtVersion =
      (await this.redisService.get(`JWT:${payload.id}`)) || '0';
    if (oldJwtVersion !== payload.jwtVersion) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
  async logout(payload: JwtPayload) {
    await this.assertJwtVersion(payload);
    const newJwtVersion = `${parseInt(payload.jwtVersion) + 1}`;
    await this.redisService.set(`JWT:${payload.id}`, newJwtVersion);
    return true;
  }
  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      await this.assertJwtVersion(payload);
      return payload;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
