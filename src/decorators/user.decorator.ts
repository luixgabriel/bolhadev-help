import {createParamDecorator,ExecutionContext, NotFoundException} from '@nestjs/common';

export const User = createParamDecorator((_data: string, context: ExecutionContext) => {

    const request = context.switchToHttp().getRequest();

    if(request.user){
        if(_data){
            return request.user[_data];
        }
        return request.user;
    }
    else {
        throw new NotFoundException("Usuário não encontrado no Request. Use o AuthGuard para obter o usuário.");
    }

});