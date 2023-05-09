import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ResponseUtil } from 'src/common/utils/ResponseUtil';

@Controller('auth/user')
export class GetAuthUserAction {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  public handle(@Req() request: Request): ResponseUtil {
    const { user } = request;

    return new ResponseUtil().setData({ user });
  }
}
