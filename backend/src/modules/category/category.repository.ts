import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(category: Prisma.CategoryCreateInput): Promise<Category> {
    return await this.prisma.category.create({ data: category });
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async update(
    categoryId: string,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: data,
    });
  }

  async delete(categoryId: string): Promise<Category> {
    return await this.prisma.category.delete({ where: { id: categoryId } });
  }

  async findById(categoryId: string): Promise<Category> {
    return await this.prisma.category.findFirst({ where: { id: categoryId } });
  }
}
