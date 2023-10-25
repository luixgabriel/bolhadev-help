import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';


export class CreateUserDto {

  static fromGithubResponse(response: any): CreateUserDto{
    return {
        githubId: response.id,
        name: response.name,
        email: response.email || `${response.login}@gmail.com`,
        password: response.name + response.id,
    };
}
  @IsString()
  @IsOptional()
  id?: string

  @IsString()
  @IsOptional()
  githubId: number

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsOptional()
  doubts?: string[];

  @IsArray()
  @IsOptional()
  answers?: string[];
}
