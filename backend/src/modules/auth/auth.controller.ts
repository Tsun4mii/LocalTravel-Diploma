import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  async handleUserRegister(@Body() user: AuthDto): Promise<Tokens> {
    return await this.authService.registerUser(user);
  }

  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  async handleUserSignin(@Body() user: AuthDto): Promise<Tokens> {
    return await this.authService.signinUser(user);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async handleUserLogout(@GetCurrentUserId() userId: string) {
    return await this.authService.logoutUser(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async handleUserRefresh(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.authService.refreshUser(userId, refreshToken);
  }
}
