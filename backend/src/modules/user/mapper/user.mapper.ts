import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateDTO } from 'src/modules/auth/dto/update.dto';

@Injectable()
export class UserMapper {
  public fromUserUpdateToUserUpdateInput(
    updateData: UpdateDTO,
  ): Prisma.UserUpdateInput {
    if (updateData.avatar) {
      return {
        username: updateData.username,
        about: updateData.about,
        avatar: { connect: { id: updateData.avatar } },
      };
    }
    return {
      username: updateData.username,
      about: updateData.about,
    };
  }
}
