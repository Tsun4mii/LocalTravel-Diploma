import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { RouteRepository } from './route.repository';
import { RouteMapper } from './mapper/route.mapper';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [PrismaModule, UserModule, MailModule],
  providers: [RouteService, RouteRepository, RouteMapper],
  controllers: [RouteController],
  exports: [RouteService],
})
export class RouteModule {}
