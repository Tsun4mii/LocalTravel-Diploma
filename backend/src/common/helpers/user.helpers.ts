import { Tokens } from 'src/modules/auth/types';
import * as bcrypt from 'bcryptjs';

export async function getTokens(
  userId: string,
  email: string,
): Promise<Tokens> {
  const [at, rt] = await Promise.all([
    this.jwt.signAsync(
      {
        sub: userId,
        email: email,
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

export function hashData(data: string) {
  return bcrypt.hash(data, 10);
}
