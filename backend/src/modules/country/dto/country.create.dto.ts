import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
