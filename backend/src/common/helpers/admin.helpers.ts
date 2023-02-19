import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminTokens } from 'src/modules/admin/types/admin.tokens';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminHelpers {
  constructor(private readonly jwt: JwtService) {}

  public async getAdminTokens(
    userId: string,
    email: string,
    role: string,
  ): Promise<AdminTokens> {
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          email: email,
          role: role,
        },
        {
          secret: process.env.ACCESS_TOKEN_ADMIN_SECRET,
          expiresIn: 60 * 10,
        },
      ),
      this.jwt.signAsync(
        {
          sub: userId,
          email: email,
          role: role,
        },
        {
          secret: process.env.REFRESH_TOKEN_ADMIN_SECRET,
          expiresIn: 60 * 60 * 24 * 3,
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
