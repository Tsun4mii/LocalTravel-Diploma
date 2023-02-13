import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthHelpers } from 'src/common/helpers';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  providers: [UserService, UserRepository, UserAuthHelpers],
  exports: [UserService, UserRepository],
})
export class UserModule {}
