import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../AuthService';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ResponseUtil } from 'src/common/utils/ResponseUtil';

@Controller('auth/login')
export class LoginAction {
  public constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(AuthGuard('local'))
  public async handle(@Req() request: Request): Promise<ResponseUtil> {
    const { user } = request;

    const token: string = await this.authService.getAccessToken(user);

    return new ResponseUtil().setData({ token });
  }
}
