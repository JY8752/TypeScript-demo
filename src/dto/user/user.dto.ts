import { Prisma } from '@prisma/client';

export type CreateUserInput = Readonly<Omit<Prisma.UserCreateInput, 'id'>>;

export type MakeFriendInput = {
  readonly userId: string;
  readonly friendId: string;
};

export type UnFriendInput = {
  readonly userId: string;
  readonly friendId: string;
};
