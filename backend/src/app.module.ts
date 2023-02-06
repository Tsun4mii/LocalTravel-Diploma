import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PointController } from './modules/point/point.controller';
import { PointModule } from './modules/point/point.module';
import { RouteController } from './modules/route/route.controller';
import { RouteModule } from './modules/route/route.module';

@Module({
  imports: [AuthModule, PointModule, RouteModule],
  controllers: [AppController, PointController, RouteController],
  providers: [AppService],
})
export class AppModule {}
