import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import { AuthLoginDTO } from './dto/auth-login.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from '@prisma/client'
import { UsersService } from 'src/users/users.service'
import { AuthRegisterDTO } from './dto/auth-register.dto'

@Injectable()
export class AuthService {
    constructor(
            private readonly jwtService: JwtService,
            private readonly prismaService: PrismaService,
            private readonly userService: UsersService
         ){}

    async createToken(user: User){
       const token = await this.jwtService.sign({
            id: user.id,
            email: user.email,
            name: user.name
        },{
            expiresIn: '7 days',
            issuer: 'bolhadev-help'
        })

        return {
            token: token
        }
    }

    async checkToken(){

    }

    async login(data: AuthLoginDTO){
        try {
            const user = await this.prismaService.user.findFirst({
                where: {
                    email: data.email
                }
            })
            if(!user) throw new HttpException('Invalid credentials.',HttpStatus.UNAUTHORIZED)

            return this.createToken(user)
            
        } catch (error) {
            console.log(error)
        }
       
    }

    async register(data: AuthRegisterDTO){
        const user = await this.userService.create(data)
        return this.createToken(user)
    }

    async forget(email: string) {
        try {
            const user = await this.prismaService.user.findFirst({
                where: {
                    email
                }
            });

            if(!user) throw new HttpException('Email invalid.',HttpStatus.UNAUTHORIZED)
    
        } catch (error) {
            
        }
    }

    // async reset(password: string, token: string){

    // }
}