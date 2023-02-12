import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRouteDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsArray()
  @IsNotEmpty()
  points: string[];
  @IsArray()
  @IsOptional()
  images?: string[];
}
