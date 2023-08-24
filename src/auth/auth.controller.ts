import { Controller,Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { UsersService } from 'src/users/users.service';
import { AuthResetDTO } from './dto/auth-reset.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersSevice: UsersService) {}

  @Post('login')
    async login(@Body() data: AuthLoginDTO) {
      return this.authService.createToken(data);
  }

  @Post('register')
    async register(@Body() data: AuthRegisterDTO) {
      return this.usersSevice.create(data)
  }

  @Post('forget')
    async forget(@Body() data: AuthForgetDTO){
  }

  @Post('reset')
  async reset(@Body() data: AuthResetDTO){

  }

}
