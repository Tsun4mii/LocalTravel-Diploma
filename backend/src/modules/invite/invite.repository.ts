import { Injectable } from '@nestjs/common';
import {
  AdminRegistrationCode,
  ADMIN_CODE_STATUS,
  Prisma,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InviteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createInvite(
    data: Prisma.AdminRegistrationCodeCreateInput,
  ): Promise<AdminRegistrationCode> {
    return await this.prisma.adminRegistrationCode.create({ data: data });
  }

  async findInviteById(inviteId: string): Promise<AdminRegistrationCode> {
    return await this.prisma.adminRegistrationCode.findUnique({
      where: {
        id: inviteId,
      },
    });
  }

  async changeInviteStatus(inviteId: string, status: ADMIN_CODE_STATUS) {
    return await this.prisma.adminRegistrationCode.update({
      where: {
        id: inviteId,
      },
      data: {
        status: status,
      },
    });
  }

  async findInviteByCode(code: string) {
    return await this.prisma.adminRegistrationCode.findFirst({
      where: {
        codeHash: code,
      },
    });
  }

  async findInviteByEmail(recipientEmail: string) {
    return await this.prisma.adminRegistrationCode.findFirst({
      where: {
        recipientEmail: recipientEmail,
      },
    });
  }

  async findAllUnaccepted() {
    return await this.prisma.adminRegistrationCode.findMany({
      where: {
        status: {
          equals: ADMIN_CODE_STATUS.WAITING_FOR_APPROVAL,
        },
      },
    });
  }

  async delete(inviteId: string) {
    return await this.prisma.adminRegistrationCode.delete({
      where: { id: inviteId },
    });
  }
}
