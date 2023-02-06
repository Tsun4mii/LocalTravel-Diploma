import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PointRepository } from './point.repository';
import { PointMapper } from './mapper/point.mapper';

@Module({
  imports: [PrismaModule],
  providers: [PointService, PointRepository, PointMapper],
  controllers: [PointController],
  exports: [PointService],
})
export class PointModule {}
