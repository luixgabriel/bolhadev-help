import { Controller, Post, Body } from '@nestjs/common';
import {UseGuards} from '@nestjs/common/decorators'
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
// import { UsersService } from 'src/users/users.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';


@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      // private readonly usersSevice: UsersService
      ) {}

  @Post('login')
    async login(@Body() data: AuthLoginDTO) {
     return this.authService.login(data) 
    }

  @Post('register')
    async register(@Body() data: AuthRegisterDTO) {
      return this.authService.register(data)
  }

  @Post('forget')
    async forget(@Body() data: AuthForgetDTO){
      this.authService.forget(data.email)
  }

  @UseGuards(AuthGuard)
  @Post('reset')
  async reset(@User() user){
    return {user}
  }

}
