import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthHelpers } from 'src/common/helpers';
import { UserMapper } from './mapper/user.mapper';
import { UserController } from './user.controller';
import { SubscriptionService } from '../subscription/subscription.service';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  providers: [
    UserService,
    UserRepository,
    UserAuthHelpers,
    UserMapper,
    SubscriptionService,
  ],
  exports: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
