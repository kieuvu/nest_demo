import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from '../user/UserService';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/UserEntity';

@Injectable()
export class AuthService {
  public constructor(
    @Inject(forwardRef((): typeof UserService => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async hashPassword(password: string): Promise<string> {
    const salt: string = await genSalt(10);
    const hashedPassword: string = await hash(password, salt);

    return hashedPassword;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user: UserEntity = await this.userService.getUserByEmail(email);

    if (user && (await this.comparePassword(password, user.password))) {
      return user;
    }

    return null;
  }

  async getAccessToken(user: any): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return this.jwtService.sign(payload);
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return compare(password, hash);
  }
}
