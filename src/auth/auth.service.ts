import {Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import { AuthLoginDTO } from './dto/auth-login.dto'
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService){

    }

    async createToken(data: AuthLoginDTO){

    }

    async checkToken(){

    }
}