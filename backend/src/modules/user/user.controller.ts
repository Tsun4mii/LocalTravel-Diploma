import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) userId: string) {
    return await this.userService.findById(userId);
  }
}
