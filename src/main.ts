import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/AppModule';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  app
    .setGlobalPrefix(configService.get<string>('routePrefix'))
    .useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<number>('port'));
}
bootstrap();
