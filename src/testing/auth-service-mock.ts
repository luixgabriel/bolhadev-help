import { AuthService } from '../auth/auth.service';
import { jwtPayload } from './jwt-payload-mock';
import loginMock from './login-mock';

export const AuthServiceMock = {
  provide: AuthService,
  useValue: {
      createToken: jest.fn().mockReturnValue(loginMock),
      checkToken: jest.fn().mockReturnValue(jwtPayload),
      isValidToken: jest.fn().mockReturnValue(true),
      login: jest.fn().mockResolvedValue(loginMock),
      register: jest.fn().mockResolvedValue(loginMock),
    //   delete: jest.fn().mockResolvedValue(true),
    //   check: jest.fn().mockResolvedValue(true)
  },
};
