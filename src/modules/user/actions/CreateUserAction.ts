import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../UserService';
import { CreateUserDTO } from 'src/common/dto/CreateUserDTO';

@Controller('user/create')
export class CreateUserAction {
  public constructor(private userService: UserService) {}

  @Post()
  public async handle(@Body() request: CreateUserDTO): Promise<object> {
    await this.userService.createUser(request);

    return {
      status: true,
    };
  }
}
