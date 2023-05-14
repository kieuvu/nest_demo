import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TodoService } from '../TodoService';
import { UserEntity } from 'src/modules/user/UserEntity';
import { TodoEntity } from '../TodoEntity';
import { ResponseUtil } from 'src/common/utils/ResponseUtil';

@Controller('todo/get')
export class GetListTodoAction {
  public constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async handle(@Req() request: Request): Promise<ResponseUtil> {
    const { user } = request;

    const userId: number = (user as UserEntity).id;

    const result: TodoEntity[] = await this.todoService.getTodoByUser(userId);

    return new ResponseUtil().setData(result);
  }
}
