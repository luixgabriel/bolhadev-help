import { Controller, Post, Body } from '@nestjs/common';
import {Get, Req, UseGuards} from '@nestjs/common/decorators'
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
  ) {}


  @Get()
  @UseGuards(AuthGuard('github'))
  async googleAuth(@Req() req) {
    console.log(req)
   }

  @Get('api/auth/github')
  @UseGuards(AuthGuard('github'))
  googleAuthRedirect(@Req() req) {
    console.log(req)
  }

  @Post('github')
  async loginWithGithub(@Body() data: {code: string}){
    return await this.authService.githubAuth(data.code)
  }

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
