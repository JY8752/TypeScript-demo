import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, User } from '@prisma/client';
import { assertUser, checkUser } from '../../../helper/user/user.helper';
import { PrismaService } from '../../../../src/repository/prisma/prisma.service';
import { UserRepository } from '../../../../src/repository/user/user.repository';

describe('UserRepository', () => {
  let repository: UserRepository;
  const testIds: string[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, PrismaService],
    }).compile();

    repository = module.get(UserRepository);

    testIds.splice(0);
  });

  afterEach(async () => {
    await repository.deleteAllByIds(testIds);
  });

  it('save and find', async () => {
    const saved = await createUser({});

    const get = await repository.findById({ id: saved.id });
    if (!get) throw new Error(`userが取得できませんでした id: ${saved.id}`);

    assertUser(get, {});
  });

  it('findMany', async () => {
    await createUser({});
    await createUser({ name: 'user2', age: 20, comment: 'test comment' });

    const result = await repository.findMany({
      where: { name: 'user2' },
    });

    expect(result.length).toBe(1);
    const actual = result[0];
    checkUser(actual);
    assertUser(actual, { name: 'user2', age: 20, comment: 'test comment' });
  });

  const createUser = async ({
    name = 'user1',
    age = 32,
    comment = null,
  }: Partial<Prisma.UserCreateInput>): Promise<User> => {
    const saved = await repository.save({ name, age, comment });
    testIds.push(saved.id);
    return saved;
  };
});
