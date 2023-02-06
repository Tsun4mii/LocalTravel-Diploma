import { Injectable } from '@nestjs/common';
import { CreateRouteDTO } from './dto/route.create.dto';
import { FindRouteDTO } from './dto/route.find.dto';
import { RouteMapper } from './mapper/route.mapper';
import { RouteRepository } from './route.repository';
import { Route } from './types';

@Injectable()
export class RouteService {
  constructor(
    private readonly routeRepository: RouteRepository,
    private readonly routeMapper: RouteMapper,
  ) {}

  async create(route: CreateRouteDTO, userId: string): Promise<Route> {
    const mappedRoute = this.routeMapper.fromRouteToRouteCreateInput(
      route,
      userId,
    );
    return await this.routeRepository.create(mappedRoute);
  }

  async findAll(params: FindRouteDTO) {
    const mappedParams = this.routeMapper.fromRouteFindToRouteFindArgs(params);
    return await this.routeRepository.findAll(mappedParams);
  }
}
