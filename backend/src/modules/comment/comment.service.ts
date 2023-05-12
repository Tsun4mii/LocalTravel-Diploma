import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDTO } from './dto/comment.create.dto';
import { CommentSearchDTO } from './dto/comment.search.dto';
import { CommentMapper } from './mapper/comment.mapper';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly commentMapper: CommentMapper,
  ) {}

  async create(userId: string, data: CreateCommentDTO) {
    const mappedData = this.commentMapper.fromCreateCommentToCreateCommentInput(
      userId,
      data,
    );
    return await this.commentRepository.create(mappedData);
  }

  async findAll(params: CommentSearchDTO) {
    const mappedParams = this.commentMapper.fromSearchToFindManyArgs(params);
    return await this.commentRepository.findAll(mappedParams);
  }
}
