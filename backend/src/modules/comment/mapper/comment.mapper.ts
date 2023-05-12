import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCommentDTO } from '../dto/comment.create.dto';
import { CommentSearchDTO } from '../dto/comment.search.dto';

@Injectable()
export class CommentMapper {
  public fromCreateCommentToCreateCommentInput(
    userId: string,
    data: CreateCommentDTO,
  ): Prisma.CommentCreateInput {
    return {
      text: data.text,
      user: { connect: { id: userId } },
      route: { connect: { id: data.routeId } },
    };
  }

  public fromSearchToFindManyArgs(
    params: CommentSearchDTO,
  ): Prisma.CommentFindManyArgs {
    return {
      include: params.include,
      where: params.where,
      orderBy: params.orderBy,
    };
  }
}
