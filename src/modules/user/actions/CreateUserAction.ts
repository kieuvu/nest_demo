import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../UserService';
import { CreateUserDTO } from 'src/common/dto/CreateUserDTO';

@Controller('user/create')
export class CreateUserAction {
  public constructor(private readonly userService: UserService) {}

  @Post()
  public async handle(@Body() request: CreateUserDTO): Promise<object> {
    const { email, username, password } = request;

    await this.userService.createUser(email, username, password);

    return {
      status: true,
    };
  }
}
