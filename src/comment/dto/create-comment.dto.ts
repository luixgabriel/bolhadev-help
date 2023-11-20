import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    content: string;
    
    @IsOptional()
    @IsNumber()
    likes: number;

    @IsOptional()
    @IsArray()
    usersLikeThisComment: string[]
  
    @IsString()
    userId: string;
    
    @IsString()
    answerId: string;
}
