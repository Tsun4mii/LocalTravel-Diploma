import { IsNotEmpty, IsString } from 'class-validator';

export class AdminAuthDTO {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
