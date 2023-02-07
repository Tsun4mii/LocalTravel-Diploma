import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storage } from './config/storage.config';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('/multiple')
  @UseInterceptors(FilesInterceptor('files', 10, { storage: storage }))
  uploadMultiple(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Post('/single')
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
