import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCountryDTO } from '../dto/country.create.dto';
import { UpdateCountryDTO } from '../dto/country.update.dto';

@Injectable()
export class CountryMapper {
  public fromCountryToCountryCreateInput(
    country: CreateCountryDTO,
  ): Prisma.CountryCreateInput {
    return {
      countryName: country.name,
    };
  }

  public fromUpdateToCountryUpdateInput(
    country: UpdateCountryDTO,
  ): Prisma.CountryUpdateInput {
    return {
      countryName: country.name,
    };
  }
}
