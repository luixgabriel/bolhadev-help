import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import {UploadedFile} from '@nestjs/common/decorators'
import { DoubtsService } from './doubts.service';
import { CreateDoubtDto } from './dto/create-doubt.dto';
import { UpdateDoubtDto } from './dto/update-doubt.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { diskStorage } from 'multer';

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
    console.log(image)
    const filename = image.filename;
    const fullPath = `http://localhost:3000/${filename}`;
    return this.doubtsService.create({...createDoubtDto, image: fullPath});
  }

  @Get()
  findAll() {
    return this.doubtsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doubtsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoubtDto: UpdateDoubtDto) {
    return this.doubtsService.update(id, updateDoubtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doubtsService.remove(id);
  }
}
