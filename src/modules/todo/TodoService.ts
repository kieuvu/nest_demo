import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './TodoEntity';
import { Repository } from 'typeorm';
import CreateTodoRequest from 'src/common/dto/CreateTodoRequest';

@Injectable()
export class TodoService {
  public constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  public async createTodo(request: CreateTodoRequest, userId: number) {
    this.todoRepository.save({
      ...request,
      userId,
    });
  }
}
