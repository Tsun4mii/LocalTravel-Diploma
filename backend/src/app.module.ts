import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ImageModule } from './modules/image/image.module';
import { PointModule } from './modules/point/point.module';
import { RouteModule } from './modules/route/route.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { InviteModule } from './modules/invite/invite.module';
import { CountryModule } from './modules/country/country.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { FollowModule } from './modules/follow/follow.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';

@Module({
  imports: [
    AuthModule,
    PointModule,
    RouteModule,
    ImageModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot(),
    AdminModule,
    InviteModule,
    CountryModule,
    CategoryModule,
    CommentModule,
    FollowModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
