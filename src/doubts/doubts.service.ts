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
    return `This action returns all doubts`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} doubt`;
  }

  async update(id: string, updateDoubtDto: UpdateDoubtDto) {
    return `This action updates a #${id} doubt`;
  }

  async remove(id: string) {
    return `This action removes a #${id} doubt`;
  }

  async check(id: string){
    try {
      console.log('chamei')
      return await this.prisma.user.findUnique({where:{id}})
    } catch (error) {
      console.log(error)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }
}
