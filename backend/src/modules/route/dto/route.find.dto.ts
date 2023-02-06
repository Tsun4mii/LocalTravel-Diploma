import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { RouteInclude } from '../types/nested.include.type';

export class FindRouteDTO {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  take?: number;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  skip?: number;
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
