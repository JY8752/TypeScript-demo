import { Injectable } from '@nestjs/common';
import { Prisma, UserFriendRelation } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserFriendRelationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(
    data: Prisma.UserFriendRelationCreateInput,
  ): Promise<UserFriendRelation> {
    return this.prismaService.userFriendRelation.create({ data });
  }

  async findByUserIdAndFriendId(
    userId: string,
    friendId: string,
  ): Promise<UserFriendRelation | null> {
    return this.prismaService.userFriendRelation.findFirst({
      where: {
        userId: userId,
        friendId: friendId,
      },
    });
  }

  async findByUserId(userId: string): Promise<UserFriendRelation[]> {
    return this.prismaService.userFriendRelation.findMany({
      where: {
        userId,
      },
    });
  }

  async exist(userId: string, friendId: string): Promise<boolean> {
    return (await this.findByUserIdAndFriendId(userId, friendId)) !== null;
  }

  async delete(userId: string, friendId: string): Promise<Prisma.BatchPayload> {
    return this.prismaService.userFriendRelation.deleteMany({
      where: {
        userId,
        friendId,
      },
    });
  }

  async deleteByIds(ids: string[]): Promise<Prisma.BatchPayload> {
    return this.prismaService.userFriendRelation.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
