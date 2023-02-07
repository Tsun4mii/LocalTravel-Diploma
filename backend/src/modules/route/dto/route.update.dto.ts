import { IsOptional, IsString } from 'class-validator';

export class UpdateRouteDTO {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
