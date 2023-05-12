import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FollowController } from './follow.controller';
import { FollowRepository } from './follow.repository';
import { FollowService } from './follow.service';
import { FollowMapper } from './mapper/follow.mapper';

@Module({
  imports: [PrismaModule],
  controllers: [FollowController],
  providers: [FollowService, FollowMapper, FollowRepository],
  exports: [FollowService],
})
export class FollowModule {}
