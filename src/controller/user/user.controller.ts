import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  CreateUserInput,
  GetUserInput,
  MakeFriendInput,
  UserResponse,
} from '../../dto/user/user.dto';
import { UserService } from '../../service/user/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('') params: GetUserInput): Promise<UserResponse> {
    return await this.userService.get(params);
  }

  @Post()
  async createUser(@Body() input: CreateUserInput): Promise<User> {
    return await this.userService.create(input);
  }

  @Post('friend')
  async friend(@Body() params: MakeFriendInput): Promise<void> {
    await this.userService.makeFriends(params);
  }
}
