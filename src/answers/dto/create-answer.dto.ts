import { IsArray, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateAnswerDto {
    @IsString()
    description: string;
    
    @IsOptional()
    @IsArray()
    usersLikeThisAnswer: string[]

    @IsOptional()
    @IsNumber()
    likes: number;
  
    @IsString()
    doubtsId: string;

    @IsString()
    userId: string;
}
  

