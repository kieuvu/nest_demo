import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './AuthService';
import { LoginAction } from './actions/LoginAction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/UserEntity';
import { UserModule } from '../user/UserModule';
import { LocalStrategy } from './LocalStrategy';
import { JwtStrategy } from './JwtStrategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/common/configs/JwtConfig';
import { ConfigModule } from '@nestjs/config';
import { GetAuthUserAction } from './actions/GetAuthUserAction';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: JwtConfig().secret,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    forwardRef((): typeof UserModule => UserModule),
  ],
  controllers: [LoginAction, GetAuthUserAction],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
