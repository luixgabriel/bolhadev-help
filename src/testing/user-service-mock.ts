import { userEntityList } from './user-entity-list-mock';
import { UsersService } from '../users/users.service';
export const UserServiceMock = {
  provide: UsersService,
  useValue: {
    user: {
      create: jest.fn().mockResolvedValue(userEntityList[0]),
      findMany: jest.fn().mockResolvedValue(userEntityList),
      findOne: jest.fn().mockResolvedValue(userEntityList[0]),
      update: jest.fn().mockResolvedValue(userEntityList[0]),
      findFirstOrThrow: jest.fn().mockResolvedValue(userEntityList[1]),
      delete: jest.fn().mockResolvedValue(true),
      check: jest.fn().mockResolvedValue(true)
    },
  },
};
