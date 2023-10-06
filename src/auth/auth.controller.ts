import { Controller, Post, Body } from '@nestjs/common';
import {Get} from '@nestjs/common/decorators'
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';


@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
  ) {}

  @Post('login')
    async login(@Body() data: AuthLoginDTO) {
     return this.authService.login(data) 
    }

  @Post('register')
    async register(@Body() data: AuthRegisterDTO) {
      return this.authService.register(data)
  }

  @Get('check')
  async checkToken(@Body() data:{token: string}){
    return this.authService.checkToken(data.token)
  }

}
