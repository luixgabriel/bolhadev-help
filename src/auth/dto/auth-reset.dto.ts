import { IsString, IsJWT } from "class-validator";

export class AuthResetDTO {
    @IsString()
    password: string

    @IsJWT()
    token: string
}