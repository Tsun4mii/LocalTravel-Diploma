import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ADMIN_ROLE } from '@prisma/client';
import { AdminRoles } from 'src/common/decorators/admin.roles.decorator';
import { AdminAccessTokenGuard } from 'src/common/guards';
import { AdminRolesGuard } from 'src/common/guards/admin.roles.guard';
import { InviteDTO } from './dto/invite.dto';
import { InviteService } from './invite.service';

@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @AdminRoles(ADMIN_ROLE.SUPER_CREATOR)
  @UseGuards(AdminAccessTokenGuard, AdminRolesGuard)
  @Post('/create')
  async createInvite(@Body() invite: InviteDTO) {
    return await this.createInvite(invite);
  }

  @AdminRoles(ADMIN_ROLE.SUPER_ACCEPTOR)
  @UseGuards(AdminAccessTokenGuard, AdminRolesGuard)
  @Post('/accept')
  async acceptInvite(@Body() body) {
    return await this.inviteService.confirmInvite(body.inviteId);
  }

  @AdminRoles(ADMIN_ROLE.SUPER_ACCEPTOR)
  @UseGuards(AdminAccessTokenGuard, AdminRolesGuard)
  @Get()
  async getAllUnaccepted() {
    return await this.inviteService.findAllUnaccepted();
  }
}
