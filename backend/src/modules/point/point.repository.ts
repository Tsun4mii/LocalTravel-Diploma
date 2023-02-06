import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Point } from './types';

@Injectable()
export class PointRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(point: Prisma.PointCreateInput): Promise<Point> {
    const newPoint = await this.prisma.point.create({
      data: point,
    });
    return new Point(newPoint.id, newPoint.name, newPoint.lat, newPoint.lon);
  }

  async findAll(): Promise<Point[]> {
    return await this.prisma.point.findMany();
  }

  async update(pointId: string, data: Prisma.PointUpdateInput): Promise<Point> {
    return this.prisma.point.update({
      where: {
        id: pointId,
      },
      data: data,
    });
  }

  async delete(pointId: string): Promise<Point> {
    return this.prisma.point.delete({
      where: {
        id: pointId,
      },
    });
  }

  async findByParams(params: Prisma.PointFindManyArgs): Promise<Point[]> {
    return this.prisma.point.findMany(params);
  }

  async findById(pointId: string): Promise<Point> {
    return this.prisma.point.findUnique({
      where: {
        id: pointId,
      },
    });
  }
}
