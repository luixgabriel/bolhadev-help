import {
    IsString,
    IsOptional,
  } from 'class-validator';

  
  export class CreateDoubtDto {
    @IsString()
    title: string;
  
    @IsString()
    category: string;
  
    @IsString()
    @IsOptional()
    image: string;
  
    @IsString()
    description: string;

    @IsString()
    userId: string;
  
   
  }
  