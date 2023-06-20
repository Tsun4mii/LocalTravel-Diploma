import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from '../prisma/prisma.module';
import { ImageController } from './image.controller';
import { ImageRepository } from './image.repository';
import { ImageService } from './image.service';
import { ImageMapper } from './mapper/image.mapper';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    PrismaModule,
  ],
  controllers: [ImageController],
  providers: [ImageService, ImageMapper, ImageRepository],
  exports: [ImageService],
})
export class ImageModule {}
