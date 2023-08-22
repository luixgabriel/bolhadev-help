import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService){}
  async create(body: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: body
      })
      return user
    } catch (error) {
      console.log(error)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
    
  }

  async findAll() {
    try {
      const user = await this.prisma.user.findMany()
      return user
    } catch (error) {
      console.log(error)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
    
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({where:{
        id
      }})
      return user
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
   
  }

  async update(id: string, body: UpdateUserDto) {
    try {
      let user = await this.findOne(id)
      if(!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
      user = await this.prisma.user.update({
        where: {
          id
        },
        data: body
      })
      return user
    } catch (error) {
      console.log(error)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
    
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.delete({where:{
        id
      }})
      return user
    } catch (error) {
      console.log(error)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
  }
}
