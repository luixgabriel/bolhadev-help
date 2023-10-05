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
    })

    it('check token', ()=> {
      const result = authService.checkToken(accessToken)
      expect(result).toEqual(jwtPayload)
    })
    
  })

});
