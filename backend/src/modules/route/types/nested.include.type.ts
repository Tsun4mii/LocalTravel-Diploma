import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class RouteInclude {
  @IsOptional()
  @Transform(({ value }) => (value == 'true' ? true : false), {
    toClassOnly: true,
  })
  points?: boolean;
  @IsOptional()
  @Transform(({ value }) => (value == 'true' ? true : false), {
    toClassOnly: true,
  })
  user?: boolean;
  @IsOptional()
  @Transform(({ value }) => (value == 'true' ? true : false), {
    toClassOnly: true,
  })
  images?: boolean;
}
