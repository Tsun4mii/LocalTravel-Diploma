import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class FollowNestedInclude {
  @IsOptional()
  @Transform(({ value }) => (value == 'true' ? true : false), {
    toClassOnly: true,
  })
  follower?: boolean;
  @IsOptional()
  @Transform(({ value }) => (value == 'true' ? true : false), {
    toClassOnly: true,
  })
  followed?: boolean;
}
