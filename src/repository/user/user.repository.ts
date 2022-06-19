import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async findById(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: userWhereUniqueInput });
  }

  async findMany({
    where,
    orderBy = { id: Prisma.SortOrder.desc },
  }: {
    where: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    return this.prismaService.user.findMany({ where, orderBy });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prismaService.user.update({ data, where });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({ where });
  }

  async deleteAllByIds(ids: string[]): Promise<Prisma.BatchPayload> {
    return this.prismaService.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
