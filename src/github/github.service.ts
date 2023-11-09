import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GithubService {
    async getAccessToken(code: string): Promise<string> {
        console.log(process.env.GITHUB_CLIENT_ID)
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
        console.log(response.data)
        return response.data.access_token;
    }

    async getUserInfo(accessToken: string) {
        const response = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log(response.data)
        return response.data;
    }
}
