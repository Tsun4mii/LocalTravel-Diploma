import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateRouteDTO } from '../dto/route.create.dto';
import { FindRouteDTO } from '../dto/route.find.dto';
import { FindOneRouteDTO } from '../dto/route.findone.dto';
import { UpdateRouteDTO } from '../dto/route.update.dto';
import { Route } from '../types';

@Injectable()
export class RouteMapper {
  public fromRouteToRouteCreateInput(
    route: CreateRouteDTO,
    userId: string,
  ): Prisma.RouteCreateInput {
    const mappedPoints = this.mapPointsToConnectArray(route.points);
    const mappedCategories = this.mapCategoriesToConnectArray(route.categories);
    if (route.images !== undefined) {
      const mappedImages = this.mapImagesToConnectArray(route.images);

      return {
        name: route.name,
        description: route.description,
        short_description: route.short_description,
        user: { connect: { id: userId } },
        points: { connect: mappedPoints },
        images: { connect: mappedImages },
        categories: { connect: mappedCategories },
        country: { connect: { id: route.country } },
      };
    }

    return {
      name: route.name,
      description: route.description,
      short_description: route.short_description,
      user: { connect: { id: userId } },
      points: { connect: mappedPoints },
      categories: { connect: mappedCategories },
      country: { connect: { id: route.country } },
    };
  }

  public fromAdminRouteToRouteCreateInput(
    route: CreateRouteDTO,
    userId: string,
  ): Prisma.RouteCreateInput {
    const mappedPoints = this.mapPointsToConnectArray(route.points);
    const mappedCategories = this.mapCategoriesToConnectArray(route.categories);
    if (route.images !== undefined) {
      const mappedImages = this.mapImagesToConnectArray(route.images);

      return {
        name: route.name,
        description: route.description,
        short_description: route.short_description,
        user: { connect: { id: '1a225a3c-ef37-455e-abe5-475ac664a6c2' } },
        points: { connect: mappedPoints },
        images: { connect: mappedImages },
        categories: { connect: mappedCategories },
        country: { connect: { id: route.country } },
      };
    }

    return {
      name: route.name,
      description: route.description,
      short_description: route.short_description,
      user: { connect: { id: '1a225a3c-ef37-455e-abe5-475ac664a6c2' } },
      points: { connect: mappedPoints },
      categories: { connect: mappedCategories },
      country: { connect: { id: route.country } },
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

  public fromOneRouteFindToRouteFindArgs(
    routeId: string,
    params: FindOneRouteDTO,
  ): Prisma.RouteFindFirstArgs {
    return {
      where: { id: routeId },
      include: params.include,
    };
  }

  public fromRouteUpdateToRouteUpdateInput(
    route: UpdateRouteDTO,
  ): Prisma.RouteUpdateInput {
    return {
      name: route.name,
      description: route.description,
      short_description: route.short_description,
    };
  }

  public isolateUserData(findResult: Route[]) {
    return this.mapUserDataInFindResult(findResult);
  }

  public convertUsersToEmails(followers) {
    return followers.map((follower) => {
      return follower.follower.email;
    });
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

  private mapCategoriesToConnectArray(categoriesArray: string[]) {
    return categoriesArray.map((category) => ({ id: category }));
  }
}
