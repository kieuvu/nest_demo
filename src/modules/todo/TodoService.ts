import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './TodoEntity';
import { Repository } from 'typeorm';
import CreateTodoRequest from 'src/common/dto/CreateTodoRequest';
import { HttpMessage } from 'src/common/utils/Enum';
import { UserService } from '../user/UserService';
import { UserEntity } from '../user/UserEntity';

@Injectable()
export class TodoService {
  public constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    private readonly userService: UserService,
  ) {}

  public async createTodo(
    request: CreateTodoRequest,
    userId: number,
  ): Promise<void> {
    const { title, description } = request;

    const user: UserEntity = await this.userService.getUserById(userId);

    if (!user) {
      throw new HttpException(HttpMessage.FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    try {
      await this.todoRepository.save({
        title,
        description,
        user,
      });
    } catch (err) {
      throw new HttpException(
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getTodoByUser(userId: number): Promise<TodoEntity[]> {
    return await this.todoRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['category'],
    });
  }
}
