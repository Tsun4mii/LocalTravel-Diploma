import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreate } from './dto/user.create.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async handleUserRegister(@Body() user: UserCreate) {
    return await this.authService.registerUser(user);
  }

  @Post('/local/signin')
  async handeleUserSignin() {
    return await this.authService.signinUser();
  }

  @Post('/logout')
  async handeleUserLogout() {
    return await this.authService.logoutUser();
  }

  @Post('/refresh')
  async handeleUserRefresh() {
    return await this.authService.refreshUser();
  }
}
