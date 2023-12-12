import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Get()
  findAll() {
    return this.answersService.findAll();
  }

  @Get('user-answers/:id')
  findAllByid(@Param('id') id: string){
    return this.answersService.userAnswersById(id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(id);
  }

  // @UseGuards(AuthGuard)
  @Patch('like/:id')
  likeAnswer(@Param('id') id: string, @Body() data: {userId: string}) {
    return this.answersService.like(id, data.userId);
  }

  @Patch('dislike/:id')
  dislikeAnswer(@Param('id') id: string, @Body() data: {userId: string}) {
    return this.answersService.dislike(id, data.userId);
  }

  
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(id, updateAnswerDto);
  }

  
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answersService.remove(id)
  }
}
