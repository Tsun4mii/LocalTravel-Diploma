import { Injectable } from '@nestjs/common';
import { AuthDto } from '../auth/dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from '../auth/types';
import { UserAuthHelpers } from 'src/common/helpers';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwt: JwtService,
    private readonly userAuthHelpers: UserAuthHelpers,
  ) {}

  async createUser(user: AuthDto): Promise<Tokens> {
    const passwordHash = await this.userAuthHelpers.hashData(user.password);
    const newUser = await this.userRepository.createUser(user, passwordHash);

    const tokens = await this.userAuthHelpers.getTokens(
      newUser.id,
      newUser.email,
      newUser.role,
    );
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
}
