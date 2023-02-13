import { Injectable } from '@nestjs/common';
import { AuthDto } from '../auth/dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserAuthHelpers } from 'src/common/helpers';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly userAuthHelpers: UserAuthHelpers,
  ) {}

  async updateRtHash(userId: string, refreshToken: string) {
    const hash = await this.userAuthHelpers.hashData(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async createUser(user: AuthDto, hash: string) {
    const newUser = await this.prisma.user.create({
      data: {
        email: user.email,
        password: hash,
      },
    });
    return newUser;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async updateOnLogout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
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
