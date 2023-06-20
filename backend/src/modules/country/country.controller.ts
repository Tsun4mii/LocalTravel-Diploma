import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Country } from '@prisma/client';
import { CountryService } from './country.service';
import { CreateCountryDTO } from './dto/country.create.dto';
import { UpdateCountryDTO } from './dto/country.update.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  async create(@Body() country: CreateCountryDTO): Promise<Country> {
    return await this.countryService.create(country);
  }

  @Get()
  async findAll(): Promise<Country[]> {
    return await this.countryService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id', new ParseUUIDPipe()) countryId: string) {
    return await this.countryService.findById(countryId);
  }

  @Delete('/:id')
  async delete(@Param('id', new ParseUUIDPipe()) countryId: string) {
    return await this.countryService.delete(countryId);
  }

  @Patch('/:id')
  async update(
    @Body() data: UpdateCountryDTO,
    @Param('id', new ParseUUIDPipe()) countryId: string,
  ) {
    return await this.countryService.update(countryId, data);
  }
}
