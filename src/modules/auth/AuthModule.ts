import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './AuthService';
import { LoginAction } from './actions/LoginAction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/UserEntity';
import { UserModule } from '../user/UserModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef((): typeof UserModule => UserModule),
  ],
  controllers: [LoginAction],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
