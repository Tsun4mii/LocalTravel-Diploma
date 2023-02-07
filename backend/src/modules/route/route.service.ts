import { Injectable } from '@nestjs/common';
import { CreateRouteDTO } from './dto/route.create.dto';
import { FindRouteDTO } from './dto/route.find.dto';
import { UpdateRouteDTO } from './dto/route.update.dto';
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
  //FIXME: ??? Better variant of isolation ???
  async findAll(params: FindRouteDTO) {
    const mappedParams = this.routeMapper.fromRouteFindToRouteFindArgs(params);
    const findResult = await this.routeRepository.findAll(mappedParams);
    if (findResult[0].hasOwnProperty('user')) {
      return this.routeMapper.isolateUserData(findResult);
    }
    return findResult;
  }

  async update(routeId: string, data: UpdateRouteDTO): Promise<Route> {
    const mappedUpdateRoute =
      this.routeMapper.fromRouteUpdateToRouteUpdateInput(data);
    return this.routeRepository.update(routeId, mappedUpdateRoute);
  }

  async delete(routeId: string): Promise<Route> {
    return await this.routeRepository.delete(routeId);
  }
  //TODO: Add include for user and points fields
  async findById(routeId: string): Promise<Route> {
    return await this.routeRepository.findById(routeId);
  }
}
