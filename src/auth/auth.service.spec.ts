import { Test, TestingModule } from '@nestjs/testing';
// import { accessToken } from '../testing/access-token-mock';
// import { jwtPayload } from '../testing/jwt-payload-mock';
import { jwtServiceMock } from '../testing/jwt-service-mock';
// import { userEntityList } from '../testing/user-entity-list-mock';
import { AuthService } from './auth.service';
import { UserPrismaMock } from '../testing/user-prisma-mock';
import { PrismaService } from '../prisma/prisma.service';
import { UserServiceMock } from '../testing/user-service-mock';
import { userEntityList } from '../testing/user-entity-list-mock';
import { accessToken } from '../testing/access-token-mock';
import { AuthServiceMock } from '../testing/auth-service-mock';
import { jwtPayload } from '../testing/jwt-payload-mock';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import loginMock from '../testing/login-mock';


describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        jwtServiceMock,
        UserPrismaMock,
        UserServiceMock,
        PrismaService,
        AuthServiceMock
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  test('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('token', ()=> {

    it('create token', ()=>{
      const result = authService.createToken(userEntityList[0])
      expect(result.token).toEqual(accessToken)
      expect(result).toEqual(loginMock)
    })

    it('check token', ()=> {
      const result = authService.checkToken(accessToken)
      expect(result).toEqual(jwtPayload)
    })

    it('valid token', ()=>{
      const result = authService.isValidToken(accessToken)
      expect(result).toBeTruthy()
    })
    
  })

  describe('login and register', ()=> {

    let userService: UsersService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [UsersService, UserPrismaMock],
      }).compile();
  
      userService = module.get<UsersService>(UsersService);
    })

  it('should do login', async ()=>{
    const data = {
      email: 'luis16757@gmail.com',
      password: '<PASSWORD>'
    }
    const result = await authService.login(data)
    expect(result.token).toEqual(accessToken)
  })

  it('should be register', async ()=>{
    const data: CreateUserDto = {
      name: 'Joao Rangel',
      email: 'joao@hcode.com.br',
      id: '1',
      password: '$2b$10$KTCMumuAvsZcxgEXCA4.x.sqeqtrWXmB7ptFGkF.f32XW3OE3Awb6',
      doubts: ['1', '2', '3'],
      answers: ['1', '2', '3'],
    }
    jest.spyOn(userService, 'create').mockResolvedValueOnce(data)
    const result = await authService.register(data)
    expect(result.token).toEqual(accessToken)
  })

})

})
