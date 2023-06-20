import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Route } from './types';

@Injectable()
export class RouteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(route: Prisma.RouteCreateInput): Promise<Route> {
    return await this.prisma.route.create({ data: route });
  }
  async findAll(params: Prisma.RouteFindManyArgs): Promise<Route[]> {
    return await this.prisma.route.findMany(params);
  }

  async update(routeId: string, data: Prisma.RouteUpdateInput): Promise<Route> {
    return await this.prisma.route.update({
      where: { id: routeId },
      data: data,
    });
  }

  async delete(routeId: string): Promise<Route> {
    return await this.prisma.route.delete({ where: { id: routeId } });
  }

  async findById(params: Prisma.RouteFindFirstArgs): Promise<Route> {
    return await this.prisma.route.findFirst(params);
  }
}
