import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/user/UserEntity';
import { UserModule } from './modules/user/UserModule';
import { AuthModule } from './modules/auth/AuthModule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      username: process.env.DATABASE_USERNAME || 'root',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'database',
      port: Number(process.env.DATABASE_PORT) || 3306,
      synchronize: Boolean(process.env.DATABASE_SYNC) || true,
      entities: [UserEntity],
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
