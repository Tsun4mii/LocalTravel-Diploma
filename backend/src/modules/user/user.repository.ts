import { Injectable } from '@nestjs/common';
import { AuthDto, RegisterDTO } from '../auth/dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserAuthHelpers } from 'src/common/helpers';
import { Prisma, ROLE } from '@prisma/client';

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

  async createUser(user: RegisterDTO, hash: string, stripeId: string) {
    const newUser = await this.prisma.user.create({
      data: {
        email: user.email,
        password: hash,
        username: user.username,
        stripeId: stripeId,
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
      include: {
        avatar: true,
        routes: true,
        followers: { include: { follower: true } },
        following: { include: { followed: true } },
      },
    });
  }
  o: Prisma.UserArgs;
  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async updateOnLogout(userId: string) {
    return await this.prisma.user.updateMany({
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

  async update(userId: string, data: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({ where: { id: userId }, data: data });
  }

  async updateRole(userId: string, role: ROLE) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        role: role,
      },
    });
  }
}
