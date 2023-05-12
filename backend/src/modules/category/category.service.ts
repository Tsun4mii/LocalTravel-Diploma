import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDTO } from './dto/category.create.dto';
import { UpdateCategoryDTO } from './dto/category.update.dto';
import { CategoryMapper } from './mapper/category.mapper';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryMapper: CategoryMapper,
  ) {}

  async create(category: CreateCategoryDTO): Promise<Category> {
    const mappedCategory =
      this.categoryMapper.fromCategoryCreateToCategoryCreateInput(category);
    return await this.categoryRepository.create(mappedCategory);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async update(categoryId: string, data: UpdateCategoryDTO): Promise<Category> {
    const mappedCategory =
      this.categoryMapper.fromCategoryUpdateToCategoryUpdateInput(data);
    return await this.categoryRepository.update(categoryId, mappedCategory);
  }

  async delete(categoryId: string): Promise<Category> {
    return await this.categoryRepository.delete(categoryId);
  }

  async findById(categoryId: string): Promise<Category> {
    return await this.categoryRepository.findById(categoryId);
  }
}
