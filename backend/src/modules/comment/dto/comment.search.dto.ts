import { Transform, Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { NestedCommentInclude } from '../types/nested.include.type';

export class CommentSearchDTO {
  @IsOptional()
  @IsObject()
  where?: object;
  @IsOptional()
  @IsObject()
  orderBy?: object;
  @IsOptional()
  @ValidateNested()
  @Type(() => NestedCommentInclude)
  include?: NestedCommentInclude;
}
