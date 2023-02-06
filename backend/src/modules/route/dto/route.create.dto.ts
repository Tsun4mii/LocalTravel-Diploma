import { IsArray, IsNotEmpty, IsString } from 'class-validator';

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
}
