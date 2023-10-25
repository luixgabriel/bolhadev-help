import {HttpException, HttpStatus, Injectable, BadRequestException, UnauthorizedException} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import { AuthLoginDTO } from './dto/auth-login.dto'
import { User } from '@prisma/client'
import { AuthRegisterDTO } from './dto/auth-register.dto'
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service'
import { UsersService } from '../users/users.service'
import axios from 'axios'

@Injectable()
export class AuthService {
    constructor(
            private readonly jwtService: JwtService,
            private readonly prismaService: PrismaService,
            private readonly userService: UsersService
         ){}

    createToken(user: User){
       const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
            name: user.name
        },{
            expiresIn: '7 days',
            issuer: 'bolhadev-help'
        })
        return {
            token: token,
            id: user.id,
            name: user.name,
            email: user.email
        }
    }

  checkToken(token: string){
        try {
            const data = this.jwtService.verify(token, {issuer: 'bolhadev-help'})
            return data
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    isValidToken(token: string){
        try {
            this.checkToken(token)
            return true    
        } catch (error) {
            return false
        }
    }

    async login(data: AuthLoginDTO){
        try {
            const user = await this.prismaService.user.findFirst({
                where: {
                    email: data.email
                }
            })
            if(!user) throw new HttpException('Invalid credentials.',HttpStatus.UNAUTHORIZED)

            if (!await bcrypt.compare(data.password, user.password)) {
                throw new UnauthorizedException('E-mail e/ou senha incorretos.');
            }
            return this.createToken(user)
            
        } catch (error) {
            throw new HttpException('Invalid credentials.',HttpStatus.UNAUTHORIZED)
        }
       
    }

    async register(data: AuthRegisterDTO){
        const user = await this.userService.create(data)
        return this.createToken(user)
    }

    async githubAuth(code: string){
        const accessTokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            null,
            {
                params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
              },
              headers: {
                Accept: 'application/json',
              },
            },
          )
          const { access_token } = accessTokenResponse.data
      
          const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
         
            const user = await this.userService.findByGithubId(userResponse.data.id)
            if(user) return this.createToken(user)
            console.log('oi')
          const data: AuthRegisterDTO = {
            githubId: userResponse.data.id,
            name: userResponse.data.name as string,    
            email: userResponse.data.email ? userResponse.data.email : `${userResponse.data.login}@gmail.com` as string,
            password: userResponse.data.name + userResponse.data.id
        }
          return this.register(data)
    }

}