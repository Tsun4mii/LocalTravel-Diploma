import { IsNotEmpty, IsString } from 'class-validator';

export class InviteDTO {
  @IsString()
  @IsNotEmpty()
  recipientEmail: string;
}
