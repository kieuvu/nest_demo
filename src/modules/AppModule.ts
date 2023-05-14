import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/UserModule';
import { AuthModule } from './auth/AuthModule';
import { databaseConfig } from 'src/common/configs/DatabaseConfig';
import { AppConfig } from 'src/common/configs/AppConfig';
import { TodoModule } from './todo/TodoModule';
import { CategoryModule } from './category/CategoryModule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [AppConfig] }),
    TypeOrmModule.forRoot(databaseConfig()),
    UserModule,
    AuthModule,
    TodoModule,
    CategoryModule,
  ],
})
export class AppModule {}
