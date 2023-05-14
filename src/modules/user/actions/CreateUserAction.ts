import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../UserService';
import { ResponseUtil } from 'src/common/utils/ResponseUtil';
import { CreateUserRequest } from 'src/common/dto/CreateUserRequest';

@Controller('user/create')
export class CreateUserAction {
  public constructor(private readonly userService: UserService) {}

  @Post()
  public async handle(
    @Body() request: CreateUserRequest,
  ): Promise<ResponseUtil> {
    await this.userService.createUser(request);

    return new ResponseUtil().setStatus(true);
  }
}
