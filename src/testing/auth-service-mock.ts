import { AuthService } from '../auth/auth.service';
import { accessToken } from './access-token-mock';
import { jwtPayload } from './jwt-payload-mock';
export const AuthServiceMock = {
  provide: AuthService,
  useValue: {
      createToken: jest.fn().mockReturnValue({token: accessToken}),
      checkToken: jest.fn().mockReturnValue(jwtPayload),
    //   findOne: jest.fn().mockResolvedValue(userEntityList[0]),
    //   update: jest.fn().mockResolvedValue(userEntityList[0]),
    //   findFirstOrThrow: jest.fn().mockResolvedValue(userEntityList[1]),
    //   delete: jest.fn().mockResolvedValue(true),
    //   check: jest.fn().mockResolvedValue(true)
  },
};
