import { Injectable } from '@nestjs/common';
import { Country } from '@prisma/client';
import { CountryRepository } from './country.repository';
import { CreateCountryDTO } from './dto/country.create.dto';
import { UpdateCountryDTO } from './dto/country.update.dto';
import { CountryMapper } from './mapper/country.mapper';

@Injectable()
export class CountryService {
  constructor(
    private readonly countryRepository: CountryRepository,
    private readonly countryMapper: CountryMapper,
  ) {}

  async create(country: CreateCountryDTO): Promise<Country> {
    const mappedCountry =
      this.countryMapper.fromCountryToCountryCreateInput(country);
    return await this.countryRepository.create(mappedCountry);
  }

  async findAll(): Promise<Country[]> {
    return await this.countryRepository.findAll();
  }

  async findById(countryId: string): Promise<Country> {
    return await this.countryRepository.findById(countryId);
  }

  async delete(countryId: string): Promise<Country> {
    return await this.countryRepository.delete(countryId);
  }

  async update(countryId: string, data: UpdateCountryDTO): Promise<Country> {
    const mappedCountry =
      this.countryMapper.fromUpdateToCountryUpdateInput(data);
    return await this.countryRepository.update(countryId, mappedCountry);
  }
}
