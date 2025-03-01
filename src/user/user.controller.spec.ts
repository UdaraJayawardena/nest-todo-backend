import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: PrismaService,
          useValue: {
            createUser: jest.fn().mockImplementation((dto: CreateUserDto) =>
              Promise.resolve({
                id: 1,
                username: dto.username,
                email: dto.email,
                password: 'hashedpassword', 
              }),
            ),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should create a user successfully', async () => {
    const userDto: CreateUserDto = {
      username: 'udara@123',
      email: 'udara@example.com',
      password: 'udara123',
    };

    const result = await userController.registerUser(userDto);

    expect(result).toEqual({
      id: 1,
      username: userDto.username,
      email: userDto.email,
      password: 'hashedpassword',
    });

    expect(userService.createUser).toHaveBeenCalledWith(userDto);
  });
});
