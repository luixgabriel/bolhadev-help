import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersModule } from "../users/users.module";
import { GithubStrategy } from "./passport-github";
import { GithubService } from "../github/github.service";

@Module({
    imports: [JwtModule.register({
        secret: '123456789'
    }),
    PrismaModule, 
    UsersModule,
],
    controllers: [AuthController],
    providers: [AuthService, GithubStrategy, GithubService],
    exports:[AuthService]
})

export class AuthModule {

}