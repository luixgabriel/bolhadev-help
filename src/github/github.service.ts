import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GithubService {
    async getAccessToken(code: string): Promise<string> {
        const response = await axios.post(
            'https://github.com/login/oauth/access_token',
            null,
            {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                },
                headers: {
                    Accept: 'application/json',
                },
            }
        );
       
        return response.data.access_token;
    }

    async getUserInfo(accessToken: string) {
        const response = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
       
        return response.data;
    }
}
