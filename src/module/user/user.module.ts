import { Module } from '@nestjs/common';
import { UserController } from 'src/controller/user/user.controller';
import { PrismaService } from 'src/repository/prisma/prisma.service';
import { UserRepository } from 'src/repository/user/user.repository';
import { UserFriendRelationRepository } from 'src/repository/user/userFriendRelation.repository';
import { UserService } from 'src/service/user/user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserFriendRelationRepository,
    PrismaService,
  ],
})
export class UserModule {}
