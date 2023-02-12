import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateRouteDTO } from '../dto/route.create.dto';
import { FindRouteDTO } from '../dto/route.find.dto';
import { UpdateRouteDTO } from '../dto/route.update.dto';
import { Route } from '../types';

@Injectable()
export class RouteMapper {
  public fromRouteToRouteCreateInput(
    route: CreateRouteDTO,
    userId: string,
  ): Prisma.RouteCreateInput {
    const mappedPoints = this.mapPointsToConnectArray(route.points);
    if (route.images !== undefined) {
      const mappedImages = this.mapImagesToConnectArray(route.images);

      return {
        name: route.name,
        description: route.description,
        user: { connect: { id: userId } },
        points: { connect: mappedPoints },
        images: { connect: mappedImages },
      };
    }

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

  public fromRouteUpdateToRouteUpdateInput(
    route: UpdateRouteDTO,
  ): Prisma.RouteUpdateInput {
    return {
      name: route.name,
      description: route.description,
    };
  }

  public isolateUserData(findResult: Route[]) {
    return this.mapUserDataInFindResult(findResult);
  }

  private mapUserDataInFindResult(findResult: Route[]) {
    return findResult.map(
      (item) =>
        (item = {
          ...item,
          user: {
            id: item.user.id,
            email: item.user.email,
            role: item.user.role,
          },
        }),
    );
  }

  private mapPointsToConnectArray(pointsArray: Array<string>) {
    return pointsArray.map((item) => ({ id: item }));
  }

  private mapImagesToConnectArray(imagesArray: string[]) {
    return imagesArray.map((image) => ({ id: image }));
  }
}
