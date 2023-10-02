import { userEntityList } from './user-entity-list-mock';
import { PrismaService } from '../prisma/prisma.service';
export const UserPrismaMock = {
  provide: PrismaService, 
  useValue: {
    user: {
      create: jest.fn().mockResolvedValue(userEntityList[0]),
      findMany: jest.fn().mockResolvedValue(userEntityList),
      findFirst: jest.fn().mockResolvedValue(userEntityList[0]),
      update: jest.fn().mockResolvedValue(userEntityList[0]),
      delete: jest.fn().mockResolvedValue(true),
    },
  },
};
