import { HttpException, HttpStatus, Injectable, Res} from '@nestjs/common';
import { CreateDoubtDto } from './dto/create-doubt.dto';
import { UpdateDoubtDto } from './dto/update-doubt.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { Response } from 'express';

@Injectable()
export class DoubtsService {

constructor(private prisma: PrismaService, private userService: UsersService){}
 async create(data: CreateDoubtDto) {
  if(!await this.userService.check(data.userId)) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    try {
      const doubt = await this.prisma.doubts.create({
        data,
        include: {
          user: true
        }
      },)
      return doubt
    } catch (error) {
      console.log(error)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
  }

  async findAll() {
    try {
      const doubts = await this.prisma.doubts.findMany({
        select: {
          id: true,
          title: true,
          category: true,
          image: true,
          description: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              imageUrl: true
            }
          },
          Answers: {
            select: {
              description: true,
              likes: true,
              createdAt: true,
              Comment: {
                select: {
                  content: true,
                  likes: true,
                  createdAt: true,
                }
              }
            }
          },
        }
      });
      
      return doubts
    } catch (error) {
      console.log(error)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
  }

  async findOne(id: string) {
    if(!await this.check(id)) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    try {
      const doubt = await this.prisma.doubts.findFirstOrThrow({where:{
        id
      },   select: {
        id: true,
        title: true,
        category: true,
        image: true,
        description: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            imageUrl: true
          }
        },
        Answers: {
          select: {
            id: true,
            description: true,
            likes: true,
            usersLikeThisAnswer: true,
            createdAt: true,
            Comment: {
              select: {
                id: true,
                user:{
                  select:{
                    id: true,
                    name: true
                  }
                },
                usersLikeThisComment: true,
                content: true,
                likes: true,
                createdAt: true,
              }
            },
            user:{
              select:{
                name: true
              }
            },
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
      }})
      return doubt
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  async update(id: string, userId: string, data: UpdateDoubtDto) {
   if(!await this.isOwner(id, userId)){
    throw new HttpException('Esse usuário não é o usuário que criou o recurso.', HttpStatus.BAD_REQUEST)
   }

   try {
    const doubt = await this.prisma.doubts.update({where: {
      id
    }, data})
    return doubt
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  async remove(id: string, userId: string, @Res() res: Response) {
    if(!await this.isOwner(id, userId)){
      throw new HttpException('Esse usuário não é o usuário que criou o recurso.', HttpStatus.BAD_REQUEST)
     }
    try {
     await this.prisma.doubts.delete({where:{
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
      return await this.prisma.doubts.findUnique({where:{id}})
    } catch (error) {
      console.log(error)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  async isOwner(id: string, userId: string): Promise<boolean> {
    const doubt = await this.findOne(id);
    return doubt.user.id === userId;
}
}
