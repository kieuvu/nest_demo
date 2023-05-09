import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/UserModule';
import { AuthModule } from './auth/AuthModule';
import { databaseConfig } from 'src/common/configs/DatabaseConfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig()),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
