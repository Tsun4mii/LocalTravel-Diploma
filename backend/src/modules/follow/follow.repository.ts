import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowRepository {
  constructor(private readonly prisma: PrismaService) {}

  async follow(data: Prisma.FollowCreateInput) {
    return await this.prisma.follow.create({ data: data });
  }

  async findMany(data: Prisma.FollowFindManyArgs) {
    return await this.prisma.follow.findMany(data);
  }

  async unfollow(followId: string) {
    return await this.prisma.follow.delete({ where: { id: followId } });
  }
}
