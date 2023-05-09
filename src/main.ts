import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/AppModule';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1/api').useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}
bootstrap();
