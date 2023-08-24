import {Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import { AuthLoginDTO } from './dto/auth-login.dto'
import { PrismaService } from 'src/prisma/prisma.service'
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService){

    }

    async createToken(data: AuthLoginDTO){

    }

    async checkToken(){

    }
}