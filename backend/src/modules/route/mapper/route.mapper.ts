import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateRouteDTO } from '../dto/route.create.dto';
import { FindRouteDTO } from '../dto/route.find.dto';

@Injectable()
export class RouteMapper {
  public fromRouteToRouteCreateInput(
    route: CreateRouteDTO,
    userId: string,
  ): Prisma.RouteCreateInput {
    const mappedPoints = this.mapPointsToConnectArray(route.points);
    return {
      name: route.name,
      description: route.description,
      user: { connect: { id: userId } },
      points: { connect: mappedPoints },
    };
  }

  public fromRouteFindToRouteFindArgs(
    params: FindRouteDTO,
  ): Prisma.RouteFindManyArgs {
    return {
      take: params.take,
      skip: params.skip,
      orderBy: params.orderBy,
      include: params.include,
      where: params.where,
    };
  }

  private mapPointsToConnectArray(pointsArray: Array<string>) {
    return pointsArray.map((item) => ({ id: item }));
  }
}
