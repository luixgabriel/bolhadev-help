import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { usersRole } from 'src/types/users-role';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(usersRole)
  @IsOptional()
  roles: usersRole

  @IsArray()
  @IsOptional()
  doubts: string[];

  @IsArray()
  @IsOptional()
  answers: string[];
}
