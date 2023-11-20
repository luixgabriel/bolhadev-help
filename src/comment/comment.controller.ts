import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Response } from 'express';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Patch('like/:id')
  likeAnswer(@Param('id') id: string, @Body() data: {userId: string}) {
    return this.commentService.like(id, data.userId);
  }

  @Patch('dislike/:id')
  dislikeAnswer(@Param('id') id: string, @Body() data: {userId: string}) {
    return this.commentService.dislike(id, data.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.commentService.remove(id, res);
  }
}
