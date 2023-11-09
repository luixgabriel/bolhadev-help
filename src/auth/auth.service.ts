import {HttpException, HttpStatus, Injectable, BadRequestException, UnauthorizedException} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import { Request, Response } from 'express'
import { AuthLoginDTO } from './dto/auth-login.dto'
import { User } from '@prisma/client'
import { AuthRegisterDTO } from './dto/auth-register.dto'
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service'
import { UsersService } from '../users/users.service'
import { GithubService } from '../github/github.service'

@Injectable()
export class AuthService {
    constructor(
            private readonly jwtService: JwtService,
            private readonly prismaService: PrismaService,
            private readonly userService: UsersService,
            private readonly gitHubService: GithubService
         ){}

    createToken(user: User){
       const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            imageUrl: user.imageUrl
        },{
            expiresIn: '7 days',
            issuer: 'bolhadev-help'
        })
        return {
            token: token,
            id: user.id,
            name: user.name,
            imageUrl: user.imageUrl,
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

    async githubAuth(code: string, response: Response){
        const accessToken = await this.gitHubService.getAccessToken(code);
        const githubUser = await this.gitHubService.getUserInfo(accessToken);
        console.log(githubUser)
        const user = await this.userService.findByGithubId(githubUser.id);
        if (user) {
            const token = this.jwtService.sign({
                id: user.id,
                email: user.email,
                name: user.name,
                imageUrl: user.imageUrl
            },{
                expiresIn: '7 days',
                issuer: 'bolhadev-help'
            })

            response.cookie('token', token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60,
            }) 
            response.setHeader('Location', 'http://localhost:3000');
            response.status(302).send();
        }
       
        // const registerData = AuthRegisterDTO.fromGithubResponse(githubUser);
        // return this.register(registerData);
    }

    async githubGetToken(req: Request, res: Response){
        const cookie = req.cookies['token'];
        try {
            const decode = this.checkToken(cookie)
            console.log(decode)
        } catch (e) {
             return res.send(null);
        }
    }

}