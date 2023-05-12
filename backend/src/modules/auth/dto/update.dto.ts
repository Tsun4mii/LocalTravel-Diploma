import { IsOptional, IsString } from 'class-validator';

export class UpdateDTO {
  @IsOptional()
  @IsString()
  password?: string;
  @IsString()
  @IsOptional()
  username?: string;
  @IsString()
  @IsOptional()
  avatar?: string;
  @IsString()
  @IsOptional()
  about?: string;
}
