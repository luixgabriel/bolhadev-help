import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Reflector } from '@nestjs/core';

export const User = createParamDecorator(async (_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  request.body.email
  
  // Aqui estamos obtendo o módulo refletor do Nest.js
  const reflector = new Reflector();

  // Usando o módulo refletor para obter a instância do UsersService
  const usersService = reflector.get<UsersService>('UsersService', ctx.getClass());

  if (!usersService) {
    throw new NotFoundException("UsersService não disponível. Certifique-se de que ele está incluído no módulo.");
  }

  try {
    // Supondo que o seu UsersService tem um método findUserById que busca um usuário pelo ID
    const fullUserDetails = await usersService.findOne(request.user.id);
    
    request.user = { ...request.user, ...fullUserDetails };
  } catch (error) {
    throw new NotFoundException("Erro ao buscar detalhes completos do usuário.");
  }

  return request.user;
});
