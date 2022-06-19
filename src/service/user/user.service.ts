import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  CreateUserInput,
  MakeFriendInput,
  UnFriendInput,
} from '../../dto/user/user.dto';
import { UserRepository } from '../../repository/user/user.repository';
import { UserFriendRelationRepository } from '../../repository/user/userFriendRelation.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFriendRelationRepository: UserFriendRelationRepository,
  ) {}

  async create(input: CreateUserInput): Promise<User> {
    return this.userRepository.save(input);
  }

  async makeFriends({ userId, friendId }: MakeFriendInput): Promise<void> {
    if (await this.userFriendRelationRepository.exist(userId, friendId))
      throw Error(`既に友達同士です userId: ${userId} friendId: ${friendId}`);
    const serverTime = new Date();

    this.userFriendRelationRepository.save({
      userId,
      friendId,
      createdAt: serverTime,
    });
    this.userFriendRelationRepository.save({
      userId: friendId,
      friendId: userId,
      createdAt: serverTime,
    });
  }

  async unfriending({ userId, friendId }: UnFriendInput): Promise<void> {
    if (!(await this.userFriendRelationRepository.exist(userId, friendId)))
      throw Error(
        `まずは友だちになることから始めましょう userId: ${userId} friendId: ${friendId}`,
      );

    this.userFriendRelationRepository.delete(userId, friendId);
    this.userFriendRelationRepository.delete(friendId, userId);
  }
}
