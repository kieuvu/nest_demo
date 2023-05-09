import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './UserService';
import { CreateUserAction } from './actions/CreateUserAction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './UserEntity';
import { AuthModule } from '../auth/AuthModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef((): typeof AuthModule => AuthModule),
  ],
  providers: [UserService],
  controllers: [CreateUserAction],
  exports: [UserService],
})
export class UserModule {}
