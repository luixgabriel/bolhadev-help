import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAnswerDto {
    @IsString()
    description: string;
    
    @IsOptional()
    @IsNumber()
    likes: number;
  
    @IsArray()
    comments: string[];
  
    @IsString()
    doubtsId: string;
  
}
