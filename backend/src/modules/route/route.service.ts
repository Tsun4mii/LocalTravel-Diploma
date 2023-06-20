import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { CreateRouteDTO } from './dto/route.create.dto';
import { FindRouteDTO } from './dto/route.find.dto';
import { FindOneRouteDTO } from './dto/route.findone.dto';
import { UpdateRouteDTO } from './dto/route.update.dto';
import { RouteMapper } from './mapper/route.mapper';
import { RouteRepository } from './route.repository';
import { Route } from './types';

@Injectable()
export class RouteService {
  constructor(
    private readonly routeRepository: RouteRepository,
    private readonly routeMapper: RouteMapper,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  async create(route: CreateRouteDTO, userId: string): Promise<Route> {
    const mappedRoute = this.routeMapper.fromRouteToRouteCreateInput(
      route,
      userId,
    );
    const user = await this.userService.findById(userId);
    const newRoute = await this.routeRepository.create(mappedRoute);
    const mappedEmailsToSend = this.routeMapper.convertUsersToEmails(
      user.followers,
    );
    await this.mailService.sendCreatedRouteNotification(
      user.username,
      mappedRoute.name,
      mappedRoute.short_description,
      mappedEmailsToSend,
    );
    return newRoute;
  }

  async createByAdmin(route: CreateRouteDTO, userId: string) {
    const mappedRoute = this.routeMapper.fromAdminRouteToRouteCreateInput(
      route,
      userId,
    );
    const user = await this.userService.findById(userId);
    const newRoute = await this.routeRepository.create(mappedRoute);
    const mappedEmailsToSend = this.routeMapper.convertUsersToEmails(
      user.followers,
    );
    await this.mailService.sendCreatedRouteNotification(
      user.username,
      mappedRoute.name,
      mappedRoute.short_description,
      mappedEmailsToSend,
    );
    return newRoute;
  }

  async findAll(params: FindRouteDTO) {
    console.log(params);
    const mappedParams = this.routeMapper.fromRouteFindToRouteFindArgs(params);
    const findResult = await this.routeRepository.findAll(mappedParams);
    if (params.include !== undefined) {
      if (params.include.user) {
        return this.routeMapper.isolateUserData(findResult);
      }
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
  async findById(routeId: string, params: FindOneRouteDTO): Promise<Route> {
    const mappedParams = this.routeMapper.fromOneRouteFindToRouteFindArgs(
      routeId,
      params,
    );
    return await this.routeRepository.findById(mappedParams);
  }
}
