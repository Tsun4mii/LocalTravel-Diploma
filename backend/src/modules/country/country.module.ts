import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CountryController } from './country.controller';
import { CountryRepository } from './country.repository';
import { CountryService } from './country.service';
import { CountryMapper } from './mapper/country.mapper';

@Module({
  imports: [PrismaModule],
  controllers: [CountryController],
  providers: [CountryService, CountryRepository, CountryMapper],
  exports: [CountryService],
})
export class CountryModule {}
