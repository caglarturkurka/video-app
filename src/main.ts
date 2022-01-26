import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as compression from 'compression';
import helmet from 'helmet';
import { swaggerSetup } from './swagger/swaggerSetup';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
  app.use(helmet());
  app.use(compression());

  // To add general prefix for end-point
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.use('/api/v1/upload', express.static('upload'));

  swaggerSetup(app);
  await app.listen(3000);
}
bootstrap();
