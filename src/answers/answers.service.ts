import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { DoubtsService } from 'src/doubts/doubts.service';

@Injectable()
export class AnswersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly doubtsService: DoubtsService,
  ) {}
  async create(data: CreateAnswerDto) {
    if (!(await this.userService.check(data.userId)))
      throw new HttpException('Not Found User', HttpStatus.NOT_FOUND);
    if (!(await this.doubtsService.check(data.doubtsId)))
      throw new HttpException('Not Found Doubt', HttpStatus.NOT_FOUND);
    try {
      const doubt = await this.prisma.answers.create({
        data,
        include: {
          doubts: true,
        },
      });
      return doubt;
    } catch (error) {
      console.log(error);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async findAll() {
    try {
      const answers = await this.prisma.answers.findMany({
        select: {
          id: true,
          description: true,
          likes: true,
          usersLikeThisAnswer: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          doubts: {
            select: {
              id: true,
              description: true,
              createdAt: true,
              userId: true,
            },
          },
          Comment: {
            select: {
              id: true,
              content: true,
              likes: true,
              createdAt: true,
            },
          },
        },
      });
      return answers;
    } catch (error) {
      console.log(error);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async findOne(id: string) {
    if (!(await this.check(id)))
      throw new HttpException('Not Found Answer.', HttpStatus.NOT_FOUND);
    try {
      const answer = await this.prisma.answers.findFirstOrThrow({
        where: {
          id,
        },
      });
      return answer;
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, data: UpdateAnswerDto) {
    if (!(await this.check(id)))
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    try {
      const answers = await this.prisma.answers.update({
        where: {
          id,
        },
        data,
      });
      return answers;
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async like(id: string, userId: string) {
    if (!(await this.check(id)))
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    let answer = await this.findOne(id);
    const userHaslikes = answer.usersLikeThisAnswer;
    if (userHaslikes.includes(userId))
      throw new HttpException(
        'This user already liked this answer',
        HttpStatus.FOUND,
      );
    userHaslikes.push(userId);
    answer = await this.update(answer.id, {
      likes: answer.likes + 1,
      usersLikeThisAnswer: userHaslikes,
    });
    return answer;
  }

  async dislike(id: string, userId: string) {
    if (!(await this.check(id)))
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    let answer = await this.findOne(id);
    const userHasLikes = answer.usersLikeThisAnswer;

    const index = userHasLikes.indexOf(userId);

    if (index === -1) {
      throw new HttpException(
        'This user did not like this answer',
        HttpStatus.FOUND,
      );
    }
    
    userHasLikes.splice(index, 1);
    answer = await this.update(answer.id, {
      likes: answer.likes - 1,
      usersLikeThisAnswer: userHasLikes,
    });
    return answer;
  }

  async remove(id: string) {
    try {
      const answer = await this.prisma.answers.delete({
        where: {
          id,
        },
      });
      return answer;
    } catch (error) {
      console.log(error);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async check(id: string) {
    try {
      return await this.prisma.answers.findUnique({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
