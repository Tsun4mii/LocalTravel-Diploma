import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class NestedCommentInclude {
  @IsOptional()
  @Transform(({ value }) => (value == 'true' ? true : false), {
    toClassOnly: true,
  })
  route?: boolean;
  @IsOptional()
  @Transform(({ value }) => (value == 'true' ? true : false), {
    toClassOnly: true,
  })
  user?: boolean;
}
