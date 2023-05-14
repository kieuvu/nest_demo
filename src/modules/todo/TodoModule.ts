import { Module } from '@nestjs/common';
import { TodoService } from './TodoService';
import { CreateTodoAction } from './actions/CreateTodoAction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './TodoEntity';
import { GetListTodoAction } from './actions/GetListTodoAction';
import { UserModule } from '../user/UserModule';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity]), UserModule],
  providers: [TodoService],
  controllers: [CreateTodoAction, GetListTodoAction],
})
export class TodoModule {}
