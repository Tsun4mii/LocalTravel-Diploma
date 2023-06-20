import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CommentCreateInput) {
    return await this.prisma.comment.create({ data: data });
  }

  async findAll(params: Prisma.CommentFindManyArgs) {
    return await this.prisma.comment.findMany(params);
  }
}
