import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UserService } from '../user/UserService';
import { compare, genSalt, hash } from 'bcrypt';
import { UserEntity } from '../user/UserEntity';
import LoginDTO from 'src/common/dto/LoginDTO';

@Injectable()
export class AuthService {
  public constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  public async hashPassword(password: string): Promise<string> {
    const salt: string = await genSalt(10);
    const hashedPassword: string = await hash(password, salt);

    return hashedPassword;
  }

  public async login(data: LoginDTO): Promise<void> {
    const user: UserEntity = await this.userService.getUserByEmail(data.email);

    if (!user) {
      throw new HttpException(
        'User Not Found In Database',
        HttpStatus.NOT_FOUND,
      );
    }

    const checkPassword: boolean = await this.comparePassword(
      data.password,
      user.password,
    );

    if (!checkPassword) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    // Generate access_token here
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return compare(password, hash);
  }
}
