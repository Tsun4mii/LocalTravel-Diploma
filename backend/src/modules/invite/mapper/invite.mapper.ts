import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InviteDTO } from '../dto/invite.dto';

@Injectable()
export class InviteMapper {
  public async CodeDataToCodeCreateInput(
    invite: InviteDTO,
    code: string,
  ): Promise<Prisma.AdminRegistrationCodeCreateInput> {
    return {
      recipientEmail: invite.recipientEmail,
      codeHash: code,
    };
  }
}
