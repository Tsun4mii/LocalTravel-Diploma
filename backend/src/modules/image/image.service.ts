import { Injectable } from '@nestjs/common';
import { ImageRepository } from './image.repository';
import { ImageMapper } from './mapper/image.mapper';
import { Image } from './types';

@Injectable()
export class ImageService {
  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly imageMapper: ImageMapper,
  ) {}

  async saveMany(files: Array<Express.Multer.File>): Promise<Image[]> {
    const mappedFiles =
      this.imageMapper.ExpressFilesToImageCreateManyInput(files);
    return await this.imageRepository.saveMany(mappedFiles);
  }

  async saveSingle(file: Express.Multer.File): Promise<Image> {
    const mappedFile = this.imageMapper.ExpressFileToImageCreateInput(file);
    return await this.imageRepository.saveSingle(mappedFile);
  }

  async findById(imageId: string): Promise<Image> {
    return await this.imageRepository.findById(imageId);
  }
}
