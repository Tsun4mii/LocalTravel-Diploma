import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class AdminAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'admin-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_ADMIN_SECRET,
    });
  }

  validate(payload: any) {
    return payload;
  }
}
