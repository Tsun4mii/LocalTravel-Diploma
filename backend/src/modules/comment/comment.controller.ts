import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { AccessTokenGuard } from 'src/common/guards';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './dto/comment.create.dto';
import { CommentSearchDTO } from './dto/comment.search.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async create(
    @GetCurrentUserId() userId: string,
    @Body() data: CreateCommentDTO,
  ) {
    return await this.commentService.create(userId, data);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAll(@Query() params: CommentSearchDTO) {
    return await this.commentService.findAll(params);
  }
}
