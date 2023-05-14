import { Module } from '@nestjs/common';
import { TodoService } from './TodoService';
import { CreateTodoAction } from './actions/CreateTodoAction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './TodoEntity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodoService],
  controllers: [CreateTodoAction],
})
export class TodoModule {}
