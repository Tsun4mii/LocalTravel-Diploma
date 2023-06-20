import { Tokens } from 'src/modules/auth/types';
import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthHelpers {
  constructor(private readonly jwt: JwtService) {}

  public async getTokens(
    userId: string,
    email: string,
    role: string,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          email: email,
          role: role,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: 60 * 15,
        },
      ),
      this.jwt.signAsync(
        {
          sub: userId,
          email: email,
          role: role,
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  public async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
