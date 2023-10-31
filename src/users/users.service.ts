import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService){}
  async create(data: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    try {
      const user = await this.prisma.user.create({
        data
      })
      delete user.password
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
      console.log(error)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
   
  }

  async findByGithubId(id: number){
    try {
      const user = await this.prisma.user.findFirst({where:{
        githubId: id
      }})
      return user
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      let user = await this.findOne(id)
      if(!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
      if(data.password){
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
      }
      user = await this.prisma.user.update({
        where: {
          id
        },
        data
      })
      delete user.password
      return user
    } catch (error) {
      console.log(error)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
    
  }

  async remove(id: string, @Res() res: Response) {
    try {
      await this.findOne(id);
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
    try {
      await this.prisma.user.delete({where:{
        id
      }})
      return res.status(HttpStatus.NO_CONTENT).json({})
    } catch (error) {
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
