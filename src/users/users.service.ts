import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
      return user
    } catch (error) {
      console.log(error)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
    
  }

  async findAll() {
    try {
      const user = await this.prisma.user.findMany()
      console.log(user)
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

  async check(id: string){
    try {
      return await this.prisma.user.findUnique({where:{id}})
    } catch (error) {
      console.log(error)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }
}
