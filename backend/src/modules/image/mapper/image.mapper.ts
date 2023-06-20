import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ImageMapper {
  public ExpressFileToImageCreateInput(
    file: Express.Multer.File,
  ): Prisma.ImageCreateInput {
    return {
      uriPath: `/uploads/${file.filename}`,
    };
  }

  public ExpressFilesToImageCreateManyInput(
    files: Array<Express.Multer.File>,
  ): Prisma.ImageCreateManyInput[] {
    return this.mapImagesArray(files);
  }

  private mapImagesArray(
    files: Array<Express.Multer.File>,
  ): Prisma.ImageCreateManyInput[] {
    return files.map((file) => ({ uriPath: `/uploads/${file.filename}` }));
  }
}
