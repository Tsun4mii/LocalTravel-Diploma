import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
}
