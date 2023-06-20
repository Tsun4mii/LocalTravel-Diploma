import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { AccessTokenGuard } from 'src/common/guards';
import { CreateFollowDTO } from './dto/follow.create.dto';
import { FollowFindDTO } from './dto/follow.find.dto';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async follow(
    @GetCurrentUserId() followrId: string,
    @Body() data: CreateFollowDTO,
  ) {
    return await this.followService.follow(followrId, data);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findMany(@Query() params: FollowFindDTO) {
    return await this.followService.findMany(params);
  }

  @Delete('/:id')
  async unfollow(@Param('id', new ParseUUIDPipe()) followId: string) {
    return await this.followService.unfollow(followId);
  }
}
