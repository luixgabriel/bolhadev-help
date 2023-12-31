import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
// import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {

  constructor(private prismaService: PrismaService){}

  async create(data: CreateCommentDto) {
    try {
      const comment = this.prismaService.comment.create({
        data
      })
      return comment
    }
    catch (error) {
      console.log(error)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
  }

  async findAll() {
    try {
      const comments = await this.prismaService.comment.findMany()
      return comments
    } catch (error) {
      console.error(error)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
  }

  async findOne(id: string) {
    try {
      const comment = await this.prismaService.comment.findFirstOrThrow({where:{
        id
      }})
      return comment
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  async update(id: string, data: UpdateCommentDto) {
    if(!await this.check(id)) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    try {
     const comment = await this.prismaService.comment.update({where: {
       id
     }, data})
     return comment
     } catch (error) {
       throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
     }
  }

  async remove(id: string,  @Res() res: Response) {
    try {
      await this.prismaService.comment.delete({where:{
         id
       }})
       return res.status(HttpStatus.NO_CONTENT).json({})
     } catch (error) {
       console.log(error)
       throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
     }
  }

  async check(id: string){
    try {
      return await this.prismaService.comment.findUnique({where:{id}})
    } catch (error) {
      console.log(error)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  async like(id: string, userId: string) {
    if (!(await this.check(id)))
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    let comment = await this.findOne(id);
    const userHaslikes = comment.usersLikeThisComment
    if (userHaslikes.includes(userId))
      throw new HttpException(
        'This user already liked this comment',
        HttpStatus.FOUND,
      );
    userHaslikes.push(userId);
    comment = await this.update(comment.id, {
      likes: comment.likes + 1,
      usersLikeThisComment: userHaslikes,
    });
    return comment;
  }

  async dislike(id: string, userId: string) {
    if (!(await this.check(id)))
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    let comment = await this.findOne(id);
    const userHasLikes = comment.usersLikeThisComment;

    const index = userHasLikes.indexOf(userId);

    if (index === -1) {
      throw new HttpException(
        'This user did not like this comment',
        HttpStatus.FOUND,
      );
    }
    
    userHasLikes.splice(index, 1);
    comment = await this.update(comment.id, {
      likes: comment.likes - 1,
      usersLikeThisComment: userHasLikes,
    });
    return comment;
  }
}
