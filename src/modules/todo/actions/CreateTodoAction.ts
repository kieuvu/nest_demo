import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import CreateTodoRequest from 'src/common/dto/CreateTodoRequest';
import { TodoService } from '../TodoService';
import { UserEntity } from 'src/modules/user/UserEntity';

@Controller('/todo/create')
export class CreateTodoAction {
  public constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async handle(@Req() request: Request, @Body() body: CreateTodoRequest) {
    const { user } = request;

    const userId: number = (user as UserEntity).id;

    await this.todoService.createTodo(body, userId);
  }
}
