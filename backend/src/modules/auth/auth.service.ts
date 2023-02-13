import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import * as bcrypt from 'bcryptjs';
import { UserAuthHelpers } from 'src/common/helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthHelpers: UserAuthHelpers,
  ) {}

  async register(user: AuthDto): Promise<Tokens> {
    return await this.userService.createUser(user);
  }

  async signin(user: AuthDto): Promise<Tokens> {
    const userExist = await this.userService.findByEmail(user.email);
    if (!userExist) {
      throw new ForbiddenException('Access Denied');
    }
    const passwordMatches = await bcrypt.compare(
      user.password,
      userExist.password,
    );
    if (!passwordMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.userAuthHelpers.getTokens(
      userExist.id,
      userExist.email,
      userExist.role,
    );
    await this.userService.updateRtHash(userExist.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string) {
    await this.userService.updateOnLogout(userId);
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRt,
    );
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.userAuthHelpers.getTokens(
      user.id,
      user.email,
      user.role,
    );
    await this.userService.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
}
