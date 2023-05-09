import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../AuthService';
import LoginDTO from 'src/common/dto/LoginDTO';

@Controller('auth/login')
export class LoginAction {
  public constructor(private readonly authService: AuthService) {}

  @Post()
  public async handle(@Body() request: LoginDTO): Promise<object> {
    await this.authService.login(request);

    return {
      status: true,
    };
  }
}
