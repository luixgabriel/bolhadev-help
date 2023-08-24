import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [JwtModule.register({
        secret: '123456789'
    })],
    controllers: [AuthController],
    exports: [AuthService]
})

export class AuthModule {

}