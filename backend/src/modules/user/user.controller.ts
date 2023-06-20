import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { AccessTokenGuard } from 'src/common/guards';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) userId: string) {
    return await this.userService.findById(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/subscribe')
  async subscribe(@GetCurrentUserId() userId: string) {
    console.log(userId);
    return await this.userService.subscribe(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/unsub')
  async unsub(@GetCurrentUserId() userId: string) {
    return await this.userService.unsub(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/update-role')
  async updateRole(@Body() body, @GetCurrentUserId() userId: string) {
    return await this.userService.updateRole(userId, body.role);
  }
}
