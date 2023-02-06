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
  //FIXME: Fix security issue (leaked user password and refresh token hashes)
  async findAll(params: Prisma.RouteFindManyArgs): Promise<Route[]> {
    return await this.prisma.route.findMany(params);
  }
}
