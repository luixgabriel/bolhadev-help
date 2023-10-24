import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import {Req, Res, UploadedFile, UseGuards} from '@nestjs/common/decorators'
import { DoubtsService } from './doubts.service';
import { CreateDoubtDto } from './dto/create-doubt.dto';
import { UpdateDoubtDto } from './dto/update-doubt.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';

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

  @Post()
  create(@Body() createDoubtDto: CreateDoubtDto, @UploadedFile() image: Express.Multer.File) {
    if(image){
      const filename = image.filename;
      const fullPath = `http://localhost:3000/${filename}`;
      return this.doubtsService.create({...createDoubtDto, image: fullPath});
    }else{
      return this.doubtsService.create(createDoubtDto);
    }
  }

  @Get()
  findAll() {
    return this.doubtsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doubtsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoubtDto: UpdateDoubtDto, @Req() request: Request) {
    return this.doubtsService.update(id, request.user.id, updateDoubtDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@Req() request: Request, @Res() res: Response) {
    return this.doubtsService.remove(id,request.user.id, res);
  }
}
