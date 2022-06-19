import { PrismaService } from '../../../../src/repository/prisma/prisma.service';
import { UserRepository } from '../../../../src/repository/user/user.repository';
import { UserFriendRelationRepository } from '../../../../src/repository/user/userFriendRelation.repository';
import { UserService } from '../../../../src/service/user/user.service';
import { assertUser, getUser } from '../../../helper/user/user.helper';

describe('UserService', () => {
  let prismaService: PrismaService;
  let userFriendRelationRepository: UserFriendRelationRepository;
  let userRepository: UserRepository;
  let service: UserService;

  beforeEach(() => {
    prismaService = new PrismaService();
    userFriendRelationRepository = new UserFriendRelationRepository(
      prismaService,
    );
    userRepository = new UserRepository(prismaService);
    service = new UserService(userRepository, userFriendRelationRepository);
  });

  test('create', async () => {
    const user = getUser();
    jest.spyOn(userRepository, 'save').mockImplementation(async () => user);

    const result = await service.create(user);

    assertUser(result, user);
  });
});
