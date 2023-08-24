import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [JwtModule.register({
        secret: '123456789'
    }),
    UsersModule,
    PrismaModule],
    controllers: [AuthController],
    exports: [AuthService]
})

export class AuthModule {

}