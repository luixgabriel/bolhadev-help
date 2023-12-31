import { Controller, Post, Body } from '@nestjs/common';
import {Get, Req, Res, UseGuards} from '@nestjs/common/decorators'
import { Response } from 'express'
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(
      private readonly authService: AuthService,
  ) {}


  @Get("auth")
  @UseGuards(AuthGuard('github'))
  async googleAuth(@Req() req) {
    console.log(req)
   }

   @Post('auth/github')
   async githubAuthRedirect(@Body() data: {code: string}) {
     return this.authService.githubAuth(data)
   }

  @Post('api/auth/github/user')
  async githubGetToken(@Res() res: Response, @Body() token: string) {
    return this.authService.githubGetToken(res, token)
  }

  @Post('auth/login')
    async login(@Body() data: AuthLoginDTO) {
     return this.authService.login(data) 
    }

  @Post('auth/register')
    async register(@Body() data: AuthRegisterDTO) {
      return this.authService.register(data)
  }

  @Get('auth/check')
  async checkToken(@Body() data:{token: string}){
    return this.authService.checkToken(data.token)
  }

}
