import { AuthService } from '../auth/auth.service';
import { accessToken } from './access-token-mock';
import { jwtPayload } from './jwt-payload-mock';

export const AuthServiceMock = {
  provide: AuthService,
  useValue: {
      createToken: jest.fn().mockReturnValue({token: accessToken}),
      checkToken: jest.fn().mockReturnValue(jwtPayload),
      isValidToken: jest.fn().mockReturnValue(true),
      login: jest.fn().mockResolvedValue({token: accessToken}),
      register: jest.fn().mockResolvedValue({token: accessToken}),
    //   delete: jest.fn().mockResolvedValue(true),
    //   check: jest.fn().mockResolvedValue(true)
  },
};
