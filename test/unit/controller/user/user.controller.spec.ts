import { ObjectId } from 'bson';
import { UserController } from '../../../../src/controller/user/user.controller';
import { UserResponse } from '../../../../src/dto/user/user.dto';
import { PrismaService } from '../../../../src/repository/prisma/prisma.service';
import { UserRepository } from '../../../../src/repository/user/user.repository';
import { UserFriendRelationRepository } from '../../../../src/repository/user/userFriendRelation.repository';
import { UserService } from '../../../../src/service/user/user.service';
import { getUser } from '../../../helper/user/user.helper';

describe('UserController', () => {
  let controller: UserController;
  let prismaService: PrismaService;
  let userService: UserService;
  let userRepository: UserRepository;
  let userFriendRelationRepository: UserFriendRelationRepository;

  beforeEach(async () => {
    prismaService = new PrismaService();
    userRepository = new UserRepository(prismaService);
    userFriendRelationRepository = new UserFriendRelationRepository(
      prismaService,
    );
    userService = new UserService(userRepository, userFriendRelationRepository);
    controller = new UserController(userService);
  });

  test('Get: /user', async () => {
    const userResponse: UserResponse = {
      ...getUser({ name: 'user1' }),
      friends: [getUser({ name: 'user2' })],
    };
    jest.spyOn(userService, 'get').mockImplementation(async () => userResponse);

    expect(
      await controller.getUser({ id: new ObjectId().toString() }),
    ).toStrictEqual(userResponse);
  });
});
