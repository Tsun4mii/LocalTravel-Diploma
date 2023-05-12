import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreatePointDTO, UpdatePointDTO } from '../dto';
import { PointParamSearchDTO } from '../dto/point.param.search.dto';

@Injectable()
export class PointMapper {
  public fromPointToPointCreateInput(
    point: CreatePointDTO,
  ): Prisma.PointCreateInput {
    return {
      name: point.name,
      lat: point.lat,
      lon: point.lon,
      address: point.address,
      country: { connect: { id: point.countryId } },
    };
  }

  public fromPointUpdateToPointUpdateInput(
    point: UpdatePointDTO,
  ): Prisma.PointUpdateInput {
    return {
      name: point.name,
      lat: point.lat,
      lon: point.lon,
    };
  }

  public fromParamsToPointFindArgs(
    params: PointParamSearchDTO,
  ): Prisma.PointFindManyArgs {
    return {
      take: params.take,
      skip: params.skip,
      where: params.where,
      orderBy: params.orderBy,
      include: params.include,
    };
  }
}
