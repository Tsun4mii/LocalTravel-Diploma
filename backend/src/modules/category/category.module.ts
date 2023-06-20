import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryMapper } from './mapper/category.mapper';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, CategoryMapper],
  exports: [CategoryService],
})
export class CategoryModule {}
