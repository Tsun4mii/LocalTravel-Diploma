import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthHelpers } from 'src/common/helpers';
import { UserMapper } from './mapper/user.mapper';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  providers: [UserService, UserRepository, UserAuthHelpers, UserMapper],
  exports: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
