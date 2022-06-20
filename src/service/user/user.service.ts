import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { filterNotNull } from '../../util/collectionUtils';
import {
  CreateUserInput,
  GetUserInput,
  MakeFriendInput,
  UnFriendInput,
  UserResponse,
} from '../../dto/user/user.dto';
import { UserRepository } from '../../repository/user/user.repository';
import { UserFriendRelationRepository } from '../../repository/user/userFriendRelation.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFriendRelationRepository: UserFriendRelationRepository,
  ) {}

  async get(input: GetUserInput): Promise<UserResponse> {
    const user = await this.userRepository.findById(input);
    if (!user) throw Error(`userが見つかりませんでした input: ${input.id}`);

    const relations =
      user && (await this.userFriendRelationRepository.findByUserId(user.id));
    const friendPromiseList = relations.map(async (relation) => {
      return await this.userRepository.findById({ id: relation.friendId });
    });
    const friends = await Promise.all(friendPromiseList);
    filterNotNull(friends);

    return {
      ...user,
      friends: friends || [],
    };
  }

  async create(input: CreateUserInput): Promise<User> {
    return this.userRepository.save(input);
  }

  async makeFriends({ userId, friendId }: MakeFriendInput): Promise<void> {
    if (await this.userFriendRelationRepository.exist(userId, friendId)) {
      throw Error(`既に友達同士です userId: ${userId} friendId: ${friendId}`);
    }
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
