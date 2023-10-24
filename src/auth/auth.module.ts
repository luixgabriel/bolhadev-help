import { Module } from "@nestjs/common";
import {forwardRef } from '@nestjs/common/utils'
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GithubStrategy } from "passport-github2";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [JwtModule.register({
        secret: '123456789'
    }),
    PrismaModule, 
    forwardRef(() => UsersModule),
    PassportModule
],
    controllers: [AuthController],
    providers: [AuthService, GithubStrategy],
    exports:[AuthService]
})

export class AuthModule {

}