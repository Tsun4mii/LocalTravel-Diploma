import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/category.create.dto';
import { UpdateCategoryDTO } from './dto/category.update.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get('/:id')
  async findById(
    @Param('id', new ParseUUIDPipe()) categoryId: string,
  ): Promise<Category> {
    return await this.categoryService.findById(categoryId);
  }

  @Post()
  async create(@Body() category: CreateCategoryDTO): Promise<Category> {
    return await this.categoryService.create(category);
  }

  @Patch('/:id')
  async update(
    @Body() data: UpdateCategoryDTO,
    @Param('id', new ParseUUIDPipe()) categoryId: string,
  ): Promise<Category> {
    return await this.categoryService.update(categoryId, data);
  }

  @Delete('/:id')
  async delete(
    @Param('id', new ParseUUIDPipe()) categoryId: string,
  ): Promise<Category> {
    return await this.categoryService.delete(categoryId);
  }
}
