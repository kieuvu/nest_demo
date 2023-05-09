import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/UserEntity';

export const databaseConfig: () => TypeOrmModuleOptions =
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'database',
    synchronize: Boolean(process.env.DATABASE_SYNC) || true,
    entities: [UserEntity],
  });
