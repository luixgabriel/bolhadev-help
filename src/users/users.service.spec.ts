import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserPrismaMock } from '../testing/user-prisma-mock';
import { userEntityList } from '../testing/user-entity-list-mock';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UserPrismaMock],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('sum', ()=> {
    function sum(a, b){
      return a + b;
    }
    expect(sum(1,2)).toBe(3);
  })

  describe('Create', () => {
    test('method create', async () => {
      const data: CreateUserDto = {
        name: 'Joao Rangel',
        email: 'joao@hcode.com.br',
        id: '1',
        password: '$2b$10$KTCMumuAvsZcxgEXCA4.x.sqeqtrWXmB7ptFGkF.f32XW3OE3Awb6',
        doubts: ['1', '2', '3'],
        answers: ['1', '2', '3'],
      }
      const result = await userService.create(data);
      expect(result).toEqual(userEntityList[0]);
    });

});

  describe('Find All', () => {
    test('method find all', async ()=> {
      const result = await userService.findAll()
      expect(result).toEqual(userEntityList);
 })
})

describe('Find One', () => {
  test('method find one', async ()=> {
    const result = await userService.findOne('2')
    expect(result).toEqual(userEntityList[1]);
})
})

describe('Update Partial', () => {
  test('method update', async ()=> {
    const data: UpdateUserDto = {
      name: 'Joao Rangel novo',
      email: 'joao@hcode.com.br',
      id: '1',
    }
    const result = await userService.update(data.id, data)
    expect(result).toEqual(userEntityList[0]);
})
})

describe('Delete', () => {
  test('method delete', async ()=> {
    const result = await userService.remove('2')
    expect(result).toBe(true);
})
})

})