import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Image } from './types';

@Injectable()
export class ImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveSingle(data: Prisma.ImageCreateInput): Promise<Image> {
    return this.prisma.image.create({ data: data });
  }

  async saveMany(data: Prisma.ImageCreateManyInput[]): Promise<Image[]> {
    return await Promise.all(await this.mapFileInfoToPromiseArray(data));
  }

  async findById(imageId: string): Promise<Image> {
    return this.prisma.image.findUnique({
      where: {
        id: imageId,
      },
    });
  }

  private async mapFileInfoToPromiseArray(
    data: Prisma.ImageCreateManyInput[],
  ): Promise<Prisma.Prisma__ImageClient<Image, never>[]> {
    return data.map((file) => this.prisma.image.create({ data: file }));
  }
}
