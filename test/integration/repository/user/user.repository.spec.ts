import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, User } from '@prisma/client';
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

  const assertUser = (
    actual: User,
    { name = 'user1', age = 32, comment = null }: Omit<Partial<User>, 'id'>,
  ) => {
    expect(actual.id).not.toBeNull();
    expect(actual.name).toBe(name);
    expect(actual.age).toBe(age);
    comment && expect(actual.comment).toBe(comment);
  };

  const checkUser: (user: any) => asserts user is User = (user) => {
    if (
      user === undefined ||
      user === null ||
      typeof user.id !== 'string' ||
      typeof user.name !== 'string' ||
      typeof user.age !== 'number' ||
      (typeof user.comment !== 'string' && typeof user.comment !== null)
    )
      throw Error('指定されたuserは存在しません');
  };
});
