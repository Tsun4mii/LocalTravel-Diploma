import { IsNotEmpty, IsString } from 'class-validator';

export class AdminRegisterDTO {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  code: string;
}
