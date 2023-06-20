import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { AdminHelpers } from 'src/common/helpers/admin.helpers';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly adminHelpers: AdminHelpers,
  ) {}

  async signup(data: Prisma.AdminCreateInput) {
    return await this.prisma.admin.create({ data: data });
  }

  async findByEmail(email: string): Promise<Admin> {
    return await this.prisma.admin.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findById(adminId: string) {
    return await this.prisma.admin.findUnique({
      where: {
        id: adminId,
      },
    });
  }

  async updateRtHash(adminID: string, refreshToken: string) {
    const hash = await this.adminHelpers.hashData(refreshToken);
    return await this.prisma.admin.update({
      where: {
        id: adminID,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async updateOnLogout(adminId: string) {
    return await this.prisma.admin.updateMany({
      where: {
        id: adminId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }
}
