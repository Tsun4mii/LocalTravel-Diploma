import { ForbiddenException, Injectable } from '@nestjs/common';
import { AdminHelpers } from 'src/common/helpers/admin.helpers';
import { AdminRepository } from './admin.repository';
import { AdminAuthDTO, AdminRegisterDTO } from './dto';
import { AdminMapper } from './mapper/admin.mapper';
import { AdminTokens } from './types/admin.tokens';
import * as bcrypt from 'bcryptjs';
import { InviteService } from '../invite/invite.service';
import { ADMIN_CODE_STATUS } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly adminMapper: AdminMapper,
    private readonly adminHelpers: AdminHelpers,
    private readonly inviteService: InviteService,
  ) {}

  async signup(admin: AdminRegisterDTO): Promise<AdminTokens> {
    const existingInvite = await this.inviteService.findByEmail(admin.email);
    if (!existingInvite) {
      throw new ForbiddenException('emails don`t match');
    }
    if (admin.code !== existingInvite.codeHash) {
      throw new ForbiddenException('Codes don`t match');
    }
    await this.inviteService.changeInviteStatus(
      existingInvite.id,
      ADMIN_CODE_STATUS.USED,
    );
    const mappedAdmin = await this.adminMapper.AdminRegisterToAdminCreateInput(
      admin,
    );
    const newAdmin = await this.adminRepository.signup(mappedAdmin);
    return await this.adminHelpers.getAdminTokens(
      newAdmin.id,
      newAdmin.email,
      newAdmin.role,
    );
  }

  async signin(admin: AdminAuthDTO): Promise<AdminTokens> {
    const adminExist = await this.adminRepository.findByEmail(admin.email);
    if (!adminExist) {
      throw new ForbiddenException('Access Denied');
    }
    const passwordMatches = await bcrypt.compare(
      admin.password,
      adminExist.password,
    );
    if (!passwordMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.adminHelpers.getAdminTokens(
      adminExist.id,
      adminExist.email,
      adminExist.role,
    );
    await this.adminRepository.updateRtHash(
      adminExist.id,
      tokens.refresh_token,
    );
    return tokens;
  }

  async logout(adminId: string) {
    return await this.adminRepository.updateOnLogout(adminId);
  }

  async refresh(adminId: string, refreshToken: string) {
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      admin.hashedRt,
    );
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.adminHelpers.getAdminTokens(
      admin.id,
      admin.email,
      admin.role,
    );
    await this.adminRepository.updateRtHash(adminId, tokens.refresh_token);
    return tokens;
  }
}
