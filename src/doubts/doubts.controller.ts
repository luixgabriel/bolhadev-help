import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import {Query, Req, Res, UploadedFile, UseGuards} from '@nestjs/common/decorators'
import { DoubtsService } from './doubts.service';
import { CreateDoubtDto } from './dto/create-doubt.dto';
import { UpdateDoubtDto } from './dto/update-doubt.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_API_HOST, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

@Controller('doubts')
export class DoubtsController {
  constructor(private readonly doubtsService: DoubtsService) {}

  @UseInterceptors(FileInterceptor('image', 
  {
    storage: diskStorage({
      destination: join(__dirname, '..', '..', 'storage'),
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
    })
  }))
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createDoubtDto: CreateDoubtDto, @UploadedFile() image: Express.Multer.File) {
    if(image){
      const data = await cloudinary.uploader.upload(image.path)
      return this.doubtsService.create({...createDoubtDto, image: data.url});
    }else{
      return this.doubtsService.create(createDoubtDto);
    }
  }

  @Get()
  findAll() {
    return this.doubtsService.findAll();
  }

  @Get('user-doubts/:id')
  findAllById(@Param('id') id: string) {
    return this.doubtsService.userDoubtsById(id);
  }

  @Get('search-doubt')
  async searchDoubt(@Query('filter') searchQuery: string) {
    return await this.doubtsService.searchQuery(searchQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doubtsService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('image', 
  {
    storage: diskStorage({
      destination: join(__dirname, '..', '..', 'storage'),
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
    })
  }))
  
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDoubtDto: UpdateDoubtDto, @UploadedFile() image: Express.Multer.File, @Req() request: Request) {
    if(image){
      const data = await cloudinary.uploader.upload(image.path)
      console.log(data)
      return this.doubtsService.update(id, request.user.id, {...updateDoubtDto, image: data.url});
    }else{
      return this.doubtsService.update(id, request.user.id, updateDoubtDto )
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@Req() request: Request, @Res() res: Response) {
    return this.doubtsService.remove(id,request.user.id, res);
  }
}
