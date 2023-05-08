import { Module } from '@nestjs/common';
import { AuthService } from './AuthService';
import { UserService } from '../user/UserService';
import { LoginAction } from './actions/LoginAction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/UserEntity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [LoginAction],
  providers: [AuthService, UserService],
})
export class AuthModule {}
