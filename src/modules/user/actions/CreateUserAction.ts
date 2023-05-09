import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../UserService';
import { CreateUserDTO } from 'src/common/dto/CreateUserDTO';
import { ResponseUtil } from 'src/common/utils/ResponseUtil';

@Controller('user/create')
export class CreateUserAction {
  public constructor(private readonly userService: UserService) {}

  @Post()
  public async handle(@Body() request: CreateUserDTO): Promise<ResponseUtil> {
    const { email, username, password } = request;

    await this.userService.createUser(email, username, password);

    return new ResponseUtil();
  }
}
