import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Patch,
} from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { AuthDto, RegisterDTO } from './dto';
import { UpdateDTO } from './dto/update.dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  async handleUserRegister(@Body() user: RegisterDTO): Promise<Tokens> {
    return await this.authService.register(user);
  }

  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  async handleUserSignin(@Body() user: AuthDto): Promise<Tokens> {
    return await this.authService.signin(user);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async handleUserLogout(@GetCurrentUserId() userId: string) {
    console.log(userId);
    return await this.authService.logout(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async handleUserRefresh(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.authService.refresh(userId, refreshToken);
  }

  @Get('/me')
  @UseGuards(AccessTokenGuard)
  async me(@GetCurrentUserId() userId: string) {
    return await this.authService.me(userId);
  }

  @Patch('/update')
  @UseGuards(AccessTokenGuard)
  async update(
    @GetCurrentUserId() userId: string,
    @Body() updateData: UpdateDTO,
  ) {
    return await this.authService.update(userId, updateData);
  }
}
