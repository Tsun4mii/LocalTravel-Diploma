import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty()
  @IsString()
  text: string;
  @IsNotEmpty()
  @IsString()
  routeId: string;
}
