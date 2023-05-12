import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRouteDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  short_description: string;
  @IsArray()
  @IsNotEmpty()
  points: string[];
  @IsArray()
  @IsOptional()
  images?: string[];
  @IsArray()
  @IsNotEmpty()
  categories: string[];
  @IsString()
  @IsNotEmpty()
  country: string;
}
