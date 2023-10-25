import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    content: string;
    
    @IsOptional()
    @IsNumber()
    likes: number;
  
    @IsString()
    userId: string;
    
    @IsString()
    answerId: string;
}
