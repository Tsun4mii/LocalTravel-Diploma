import { IsOptional, IsString } from 'class-validator';

export class UpdateCountryDTO {
  @IsOptional()
  @IsString()
  name?: string;
}
