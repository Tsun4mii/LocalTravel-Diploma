import { Injectable } from '@nestjs/common';
import { CreatePointDTO, UpdatePointDTO } from './dto';
import { PointParamSearchDTO } from './dto/point.param.search.dto';
import { PointMapper } from './mapper/point.mapper';
import { PointRepository } from './point.repository';
import { Point } from './types';

@Injectable()
export class PointService {
  constructor(
    private readonly repository: PointRepository,
    private readonly pointMapper: PointMapper,
  ) {}

  async create(point: CreatePointDTO): Promise<Point> {
    const mappedPoint = this.pointMapper.fromPointToPointCreateInput(point);
    return await this.repository.create(mappedPoint);
  }

  async update(pointId: string, data: UpdatePointDTO): Promise<Point> {
    const mappedUpdatePoint =
      this.pointMapper.fromPointUpdateToPointUpdateInput(data);
    return await this.repository.update(pointId, mappedUpdatePoint);
  }

  async delete(pointId: string): Promise<Point> {
    return await this.repository.delete(pointId);
  }

  async findAll(params: PointParamSearchDTO): Promise<Point[]> {
    const mappedParams = this.pointMapper.fromParamsToPointFindArgs(params);
    return this.repository.findByParams(mappedParams);
  }

  async findById(pointId: string): Promise<Point> {
    return this.repository.findById(pointId);
  }
}
