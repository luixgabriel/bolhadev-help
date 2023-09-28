import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDoubtDto } from './dto/create-doubt.dto';
import { UpdateDoubtDto } from './dto/update-doubt.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoubtsService {

constructor(private prisma: PrismaService){}
 async create(data: CreateDoubtDto) {
  if(!await this.check(data.userId)) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
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
          Answers: true,
          user: {
            select: {
              name: true
            }
          }
        }
      })
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
      }})
      return doubt
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  async update(id: string, data: UpdateDoubtDto) {
   if(!await this.check(id)) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
   try {
    const doubt = await this.prisma.doubts.update({where: {
      id
    }, data})
    return doubt
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  async remove(id: string) {
    try {
      const doubt = await this.prisma.doubts.delete({where:{
        id
      }})
      return doubt
    } catch (error) {
      console.log(error)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
  }

  async check(id: string){
    try {
      return await this.prisma.user.findUnique({where:{id}})
    } catch (error) {
      console.log(error)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }
}
