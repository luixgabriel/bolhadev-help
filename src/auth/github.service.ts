import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import {PassportStrategy} from '@nestjs/passport';
import { Strategy } from 'passport-github2'
// ... outros imports ...

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {

    constructor(
        @Inject(forwardRef(() => AuthService)) 
        private readonly authService: AuthService,

        @Inject(forwardRef(() => UsersService)) 
        private readonly usersService: UsersService
    ) {
        super({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/github/callback',
            scope: ['user:email'],
        });
    }

    // ... restante da classe ...
}
