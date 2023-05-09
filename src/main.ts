import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/AppModule';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1/api').useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}
bootstrap();
