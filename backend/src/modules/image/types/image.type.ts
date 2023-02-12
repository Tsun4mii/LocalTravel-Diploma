import { IsString } from 'class-validator';

export class Image {
  @IsString()
  id: string;
  @IsString()
  uriPath: string;
}
