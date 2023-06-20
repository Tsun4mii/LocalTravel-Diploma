import { Injectable } from '@nestjs/common';
import { Country, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CountryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(country: Prisma.CountryCreateInput): Promise<Country> {
    return await this.prisma.country.create({
      data: country,
    });
  }

  async findById(countryId: string): Promise<Country> {
    return await this.prisma.country.findFirst({ where: { id: countryId } });
  }

  async findAll(): Promise<Country[]> {
    return await this.prisma.country.findMany();
  }

  async delete(countryId: string): Promise<Country> {
    return await this.prisma.country.delete({
      where: {
        id: countryId,
      },
    });
  }

  async update(
    countryId: string,
    data: Prisma.CountryUpdateInput,
  ): Promise<Country> {
    return await this.prisma.country.update({
      where: { id: countryId },
      data: data,
    });
  }
}
