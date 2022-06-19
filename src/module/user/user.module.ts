import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repository/prisma/prisma.service';
import { UserRepository } from 'src/repository/user/user.repository';
import { UserFriendRelationRepository } from 'src/repository/user/userFriendRelation.repository';
import { UserService } from 'src/service/user/user.service';

@Module({
  providers: [
    UserService,
    UserRepository,
    UserFriendRelationRepository,
    PrismaService,
  ],
})
export class UserModule {}
