// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Express {
    export interface Request {
        user?: any; // ou substitua 'any' pelo tipo do seu usuário, por exemplo UserType
    }
}