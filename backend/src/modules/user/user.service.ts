import { Injectable } from '@nestjs/common';
import { AuthDto } from '../auth/dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Tokens } from '../auth/types';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwt: JwtService,
  ) {}

  async createUser(user: AuthDto): Promise<Tokens> {
    const passwordHash = await this.hashData(user.password);
    const newUser = await this.userRepository.createUser(user, passwordHash);

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.userRepository.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findById(userId: string) {
    return await this.userRepository.findById(userId);
  }

  async updateRtHash(userId: string, refreshToken: string) {
    return await this.userRepository.updateRtHash(userId, refreshToken);
  }

  async updateOnLogout(userId: string) {
    return await this.userRepository.updateOnLogout(userId);
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwt.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
