import { User, UserFriendRelation } from '@prisma/client';
import { ObjectId } from 'bson';

export const getUser = (
  {
    id = new ObjectId().toString(),
    name = 'user1',
    age = 32,
    comment = null,
  }: Partial<User> = {
    id: new ObjectId().toString(),
    name: 'user1',
    age: 32,
    comment: null,
  },
): User => {
  return {
    id,
    name,
    age,
    comment,
  };
};

export const assertUser = (
  actual: User,
  { name = 'user1', age = 32, comment = null }: Omit<Partial<User>, 'id'>,
) => {
  expect(actual.id).not.toBeNull();
  expect(actual.name).toBe(name);
  expect(actual.age).toBe(age);
  comment && expect(actual.comment).toBe(comment);
};

export const checkUser: (user: any) => asserts user is User = (user) => {
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

export const assertUserFriendRelation = (
  actual: UserFriendRelation,
  { userId, friendId, createdAt }: Omit<UserFriendRelation, 'id'>,
) => {
  expect(actual.id).not.toBeNull;
  expect(actual.userId).toBe(userId);
  expect(actual.friendId).toBe(friendId);
  expect(actual.createdAt).toStrictEqual(createdAt);
};

export const isUserFriendRelation: (
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
