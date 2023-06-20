import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateFollowDTO } from '../dto/follow.create.dto';
import { FollowFindDTO } from '../dto/follow.find.dto';

@Injectable()
export class FollowMapper {
  public fromCreateToCreateFollowInput(
    followerId: string,
    data: CreateFollowDTO,
  ): Prisma.FollowCreateInput {
    return {
      notify: data.notify,
      follower: { connect: { id: followerId } },
      followed: { connect: { id: data.followedId } },
    };
  }

  public fromFindToFindManyInput(
    data: FollowFindDTO,
  ): Prisma.FollowFindManyArgs {
    return {
      include: data.include,
      where: data.where,
    };
  }
}
