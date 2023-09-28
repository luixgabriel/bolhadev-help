import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAnswerDto {
    @IsString()
    description: string;
    
    @IsOptional()
    @IsNumber()
    likes: number;
  
    @IsString()
    doubtsId: string;

    @IsString()
    userId: string;
}
  

