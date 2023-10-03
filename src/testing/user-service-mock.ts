import { userEntityList } from './user-entity-list-mock';
import { PrismaService } from '../prisma/prisma.service';
export const UserPrismaMock = {
  provide: PrismaService, 
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
