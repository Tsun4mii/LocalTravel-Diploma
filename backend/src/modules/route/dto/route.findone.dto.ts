import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { RouteInclude } from '../types/nested.include.type';

export class FindOneRouteDTO {
  @IsOptional()
  @IsObject()
  where?: object;
  @IsOptional()
  @IsObject()
  orderBy?: object;
  @IsOptional()
  @ValidateNested()
  @Type(() => RouteInclude)
  include?: RouteInclude;
}
