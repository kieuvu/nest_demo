import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/AppModule';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  app
    .setGlobalPrefix(configService.get<string>('APP_ROUTE_PREFIX'))
    .useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<number>('APP_PORT') || 3000);
}
bootstrap();
