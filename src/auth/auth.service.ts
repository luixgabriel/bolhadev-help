import {HttpException, HttpStatus, Injectable, BadRequestException, UnauthorizedException} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import { AuthLoginDTO } from './dto/auth-login.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from '@prisma/client'
import { UsersService } from 'src/users/users.service'
import { AuthRegisterDTO } from './dto/auth-register.dto'
import * as bcrypt from 'bcrypt';

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
        console.log(token)

        return {
            token: token
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