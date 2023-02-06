import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PointController } from './modules/point/point.controller';
import { PointModule } from './modules/point/point.module';

@Module({
  imports: [AuthModule, PointModule],
  controllers: [AppController, PointController],
  providers: [AppService],
})
export class AppModule {}
