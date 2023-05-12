import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateFollowDTO {
  @IsNotEmpty()
  @IsString()
  followedId: string;
  @IsNotEmpty()
  @IsBoolean()
  notify: boolean;
}
