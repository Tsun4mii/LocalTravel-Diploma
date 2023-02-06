import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePointDTO, UpdatePointDTO } from './dto';
import { PointParamSearchDTO } from './dto/point.param.search.dto';
import { PointService } from './point.service';
import { Point } from './types';

@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Post()
  async create(@Body() point: CreatePointDTO): Promise<Point> {
    return await this.pointService.create(point);
  }

  @Patch('/:id')
  async update(
    @Body() data: UpdatePointDTO,
    @Param('id', new ParseUUIDPipe()) pointId: string,
  ): Promise<Point> {
    return await this.pointService.update(pointId, data);
  }

  @Delete('/:id')
  async delete(
    @Param('id', new ParseUUIDPipe()) pointId: string,
  ): Promise<Point> {
    return await this.pointService.delete(pointId);
  }

  @Get('')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() params: PointParamSearchDTO): Promise<Point[]> {
    console.log(params);
    return await this.pointService.findAll(params);
  }

  @Get('/:id')
  async findById(
    @Param('id', new ParseUUIDPipe()) pointId: string,
  ): Promise<Point> {
    return this.pointService.findById(pointId);
  }
}
