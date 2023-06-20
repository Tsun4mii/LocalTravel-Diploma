import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCategoryDTO } from '../dto/category.create.dto';
import { UpdateCategoryDTO } from '../dto/category.update.dto';

@Injectable()
export class CategoryMapper {
  public fromCategoryCreateToCategoryCreateInput(
    category: CreateCategoryDTO,
  ): Prisma.CategoryCreateInput {
    return {
      categoryName: category.name,
    };
  }

  public fromCategoryUpdateToCategoryUpdateInput(
    data: UpdateCategoryDTO,
  ): Prisma.CategoryUpdateInput {
    return {
      categoryName: data.name,
    };
  }
}
