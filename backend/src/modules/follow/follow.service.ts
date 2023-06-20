import { Injectable } from '@nestjs/common';
import { CreateFollowDTO } from './dto/follow.create.dto';
import { FollowFindDTO } from './dto/follow.find.dto';
import { FollowRepository } from './follow.repository';
import { FollowMapper } from './mapper/follow.mapper';

@Injectable()
export class FollowService {
  constructor(
    private readonly followRepository: FollowRepository,
    private readonly followMapper: FollowMapper,
  ) {}

  async follow(followerId: string, data: CreateFollowDTO) {
    const mappedData = this.followMapper.fromCreateToCreateFollowInput(
      followerId,
      data,
    );
    return await this.followRepository.follow(mappedData);
  }

  async findMany(params: FollowFindDTO) {
    const mappedParams = this.followMapper.fromFindToFindManyInput(params);
    return await this.followRepository.findMany(mappedParams);
  }

  async unfollow(followId: string) {
    return await this.followRepository.unfollow(followId);
  }
}
