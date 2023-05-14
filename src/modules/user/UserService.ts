import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from '../auth/AuthService';
import { UserEntity } from './UserEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpMessage } from 'src/common/utils/Enum';
import { CreateUserRequest } from 'src/common/dto/CreateUserRequest';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef((): typeof AuthService => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async createUser(request: CreateUserRequest): Promise<void> {
    let { password } = request;
    const { username, email } = request;

    password = await this.authService.hashPassword(password);

    const existingUser: UserEntity = await this.getUserByEmail(email);

    if (existingUser) {
      throw new HttpException(
        HttpMessage.EMAIL_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRepository.save({ email, password, username });
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  public async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
}
