import { Injectable } from '@nestjs/common';
import { ADMIN_CODE_STATUS } from '@prisma/client';
import { nanoid } from 'nanoid';
import { MailService } from '../mail/mail.service';
import { InviteDTO } from './dto/invite.dto';
import { InviteRepository } from './invite.repository';
import { InviteMapper } from './mapper/invite.mapper';

@Injectable()
export class InviteService {
  constructor(
    private readonly inviteRepository: InviteRepository,
    private readonly inviteMapper: InviteMapper,
    private readonly mailService: MailService,
  ) {}

  async createInvite(invite: InviteDTO) {
    const code = nanoid();
    const mappedCodeData = await this.inviteMapper.CodeDataToCodeCreateInput(
      invite,
      code,
    );
    return await this.inviteRepository.createInvite(mappedCodeData);
  }

  async confirmInvite(inviteId: string) {
    const invite = await this.inviteRepository.findInviteById(inviteId);
    await this.mailService.sendAdminRegistrationCode(
      invite.recipientEmail,
      invite.codeHash,
    );
    return await this.inviteRepository.changeInviteStatus(
      invite.id,
      ADMIN_CODE_STATUS.APPROVED,
    );
  }

  async findByEmail(recipientEmail: string) {
    return await this.inviteRepository.findInviteByEmail(recipientEmail);
  }

  async changeInviteStatus(inviteId: string, status: ADMIN_CODE_STATUS) {
    return await this.inviteRepository.changeInviteStatus(inviteId, status);
  }

  async findAllUnaccepted() {
    return await this.inviteRepository.findAllUnaccepted();
  }

  async delete(inviteId: string) {
    return await this.inviteRepository.delete(inviteId);
  }
}
