import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth/user')
export class GetAuthUserAction {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  public handle(@Req() request: Request): object {
    return {
      status: true,
      data: {
        user: request.user,
      },
    };
  }
}
