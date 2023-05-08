import { Module } from '@nestjs/common';
import { UserService } from './UserService';
import { CreateUserAction } from './actions/CreateUserAction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './UserEntity';
import { AuthService } from '../auth/AuthService';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, AuthService],
  controllers: [CreateUserAction],
})
export class UserModule {}
