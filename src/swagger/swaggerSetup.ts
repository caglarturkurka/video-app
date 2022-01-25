import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerSetup = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Video API')
    .setDescription('These are all video api endpoints.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};
