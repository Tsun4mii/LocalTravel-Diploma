import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storage } from './config/storage.config';
import { ImageService } from './image.service';
import { Image } from './types';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('/multiple')
  @UseInterceptors(FilesInterceptor('files', 10, { storage: storage }))
  async uploadMultiple(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.imageService.saveMany(files);
  }

  @Post('/single')
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return await this.imageService.saveSingle(file);
  }

  @Get('/:id')
  async findById(
    @Param('id', new ParseUUIDPipe()) imageId: string,
  ): Promise<Image> {
    return await this.imageService.findById(imageId);
  }
}
