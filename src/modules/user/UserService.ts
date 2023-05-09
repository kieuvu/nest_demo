import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from '../auth/AuthService';
import { CreateUserDTO } from 'src/common/dto/CreateUserDTO';
import { UserEntity } from './UserEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpMessage } from 'src/common/utils/enum';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef((): typeof AuthService => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async createUser(data: CreateUserDTO) {
    data.password = await this.authService.hashPassword(data.password);

    const existingUser: UserEntity = await this.getUserByEmail(data.email);

    if (existingUser) {
      throw new HttpException(
        HttpMessage.EMAIL_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRepository.save(data);
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
