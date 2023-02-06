import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePointDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  lat: string;
  @IsNotEmpty()
  @IsString()
  lon: string;
}
