import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminRepository } from './admin.repository';
import { AdminMapper } from './mapper/admin.mapper';
import { AdminHelpers } from 'src/common/helpers/admin.helpers';
import { JwtService } from '@nestjs/jwt';
import {
  AdminAccessTokenStrategy,
  AdminRefreshTokenStrategy,
} from './strategies';
import { AdminRolesGuard } from 'src/common/guards/admin.roles.guard';
import { InviteModule } from '../invite/invite.module';

@Module({
  imports: [PrismaModule, InviteModule],
  providers: [
    AdminService,
    AdminRepository,
    AdminMapper,
    AdminHelpers,
    JwtService,
    AdminAccessTokenStrategy,
    AdminRefreshTokenStrategy,
    AdminRolesGuard,
  ],
  controllers: [AdminController],
})
export class AdminModule {}
