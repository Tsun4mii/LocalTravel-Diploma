import { IsOptional, IsString } from 'class-validator';

export class UpdatePointDTO {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  lat?: string;
  @IsString()
  @IsOptional()
  lon?: string;
}
