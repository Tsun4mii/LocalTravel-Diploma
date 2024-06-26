import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { JwtService } from '@nestjs/jwt';
import { UserAuthHelpers } from 'src/common/helpers';
import { UserMapper } from '../user/mapper/user.mapper';
import { SubscriptionModule } from '../subscription/subscription.module';
import { SubscriptionService } from '../subscription/subscription.service';

@Module({
  imports: [UserModule, SubscriptionModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    JwtService,
    UserAuthHelpers,
    UserMapper,
    SubscriptionService,
  ],
})
export class AuthModule {}
