import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';
import {
  AdminAccessTokenGuard,
  AdminRefreshTokenGuard,
} from 'src/common/guards';
import { AdminService } from './admin.service';
import { AdminRegisterDTO } from './dto';
import { AdminAuthDTO } from './dto/admin.auth.dto';
import { AdminTokens } from './types/admin.tokens';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/auth/local/signup')
  async signup(@Body() admin: AdminRegisterDTO): Promise<AdminTokens> {
    return await this.adminService.signup(admin);
  }

  @Post('/auth/local/signin')
  async signin(@Body() admin: AdminAuthDTO): Promise<AdminTokens> {
    return await this.adminService.signin(admin);
  }

  @UseGuards(AdminAccessTokenGuard)
  @Post('/auth/logout')
  async logout(@GetCurrentUserId() adminId: string) {
    return await this.adminService.logout(adminId);
  }

  @UseGuards(AdminRefreshTokenGuard)
  @Post('/auth/refresh')
  async refresh(
    @GetCurrentUserId() adminId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return await this.adminService.refresh(adminId, refreshToken);
  }
}
