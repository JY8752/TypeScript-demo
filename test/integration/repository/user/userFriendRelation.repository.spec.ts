import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, UserFriendRelation } from '@prisma/client';
import { ObjectId } from 'bson';
import { PrismaService } from '../../../../src/repository/prisma/prisma.service';
import { UserFriendRelationRepository } from '../../../../src/repository/user/userFriendRelation.repository';

describe('UserFriendRelationRepository', () => {
  let repository: UserFriendRelationRepository;
  const testIds: string[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFriendRelationRepository, PrismaService],
    }).compile();

    repository = module.get(UserFriendRelationRepository);

    testIds.splice(0);
  });

  afterEach(async () => {
    await repository.deleteByIds(testIds);
  });

  it('save and find', async () => {
    const testTime = new Date();
    const userId1 = new ObjectId();
    const userId2 = new ObjectId();
    await createUserFriendRelation({
      userId: userId1.toString(),
      friendId: userId2.toString(),
      createdAt: testTime,
    });

    const result = await repository.findByUserIdAndFriendId(
      userId1.toString(),
      userId2.toString(),
    );

    isUserFriendRelation(result);
    assertUserFriendRelation(result, {
      userId: userId1.toString(),
      friendId: userId2.toString(),
      createdAt: testTime,
    });
  });

  it('delete', async () => {
    const doc = await createUserFriendRelation();

    repository.deleteByIds([doc.id]).then(async () => {
      expect(repository.exist(doc.userId, doc.friendId)).toBe(false);
    });
  });

  const createUserFriendRelation = async (
    {
      userId = new ObjectId().toString(),
      friendId = new ObjectId().toString(),
      createdAt = new Date(),
    }: Omit<Partial<Prisma.UserFriendRelationCreateInput>, 'id'> = {
      userId: new ObjectId().toString(),
      friendId: new ObjectId().toString(),
      createdAt: new Date(),
    },
  ): Promise<UserFriendRelation> => {
    const saved = await repository.save({
      userId,
      friendId,
      createdAt,
    });
    testIds.push(saved.id);
    return saved;
  };

  const assertUserFriendRelation = (
    actual: UserFriendRelation,
    { userId, friendId, createdAt }: Omit<UserFriendRelation, 'id'>,
  ) => {
    expect(actual.id).not.toBeNull;
    expect(actual.userId).toBe(userId);
    expect(actual.friendId).toBe(friendId);
    expect(actual.createdAt).toStrictEqual(createdAt);
  };

  const isUserFriendRelation: (
    value: any,
  ) => asserts value is UserFriendRelation = (value) => {
    if (
      value === null ||
      value === undefined ||
      typeof value.id !== 'string' ||
      typeof value.userId !== 'string' ||
      typeof value.friendId !== 'string' ||
      Object.prototype.toString.call(value.createdAt) !== '[object Date]'
    ) {
      console.log(value);
      throw new Error('指定されたUserFriendRelationは存在しません');
    }
  };
});
