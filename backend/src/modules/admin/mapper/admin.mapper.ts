import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import { AdminRegisterDTO } from '../dto';

@Injectable()
export class AdminMapper {
  public async AdminRegisterToAdminCreateInput(
    admin: AdminRegisterDTO,
  ): Promise<Prisma.AdminCreateInput> {
    const hashedPass = await hash(admin.password, 10);
    return {
      email: admin.email,
      password: hashedPass,
    };
  }

  public async HidePrivateInfo(admin: Admin) {
    return {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };
  }
}
