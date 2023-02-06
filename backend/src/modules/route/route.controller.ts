import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { AccessTokenGuard } from 'src/common/guards';
import { CreateRouteDTO } from './dto/route.create.dto';
import { FindRouteDTO } from './dto/route.find.dto';
import { RouteService } from './route.service';
import { Route } from './types';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @Body() route: CreateRouteDTO,
    @GetCurrentUserId() userId: string,
  ): Promise<Route> {
    return await this.routeService.create(route, userId);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() params: FindRouteDTO): Promise<Route[]> {
    return await this.routeService.findAll(params);
  }
}
