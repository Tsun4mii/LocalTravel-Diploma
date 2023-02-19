import { Module } from '@nestjs/common';
import { MailModule } from '../mail/mail.module';
import { PrismaModule } from '../prisma/prisma.module';
import { InviteRepository } from './invite.repository';
import { InviteService } from './invite.service';
import { InviteMapper } from './mapper/invite.mapper';
import { InviteController } from './invite.controller';
import {
  AdminAccessTokenGuard,
  AdminRefreshTokenGuard,
} from 'src/common/guards';
import { AdminRolesGuard } from 'src/common/guards/admin.roles.guard';

@Module({
  imports: [PrismaModule, MailModule],
  providers: [
    InviteService,
    InviteRepository,
    InviteMapper,
    AdminAccessTokenGuard,
    AdminRefreshTokenGuard,
    AdminRolesGuard,
  ],
  exports: [InviteService],
  controllers: [InviteController],
})
export class InviteModule {}
