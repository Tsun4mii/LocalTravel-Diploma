import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { FollowNestedInclude } from '../types/follow.nested.include';

export class FollowFindDTO {
  @IsOptional()
  @IsObject()
  where?: object;
  @IsOptional()
  @ValidateNested()
  @Type(() => FollowNestedInclude)
  include?: FollowNestedInclude;
}
