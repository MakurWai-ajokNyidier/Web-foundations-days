import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // GLOBAL VALIDATION
  app.useGlobalPipes(

    new ValidationPipe({

      whitelist: true,

      transform: true,

      forbidNonWhitelisted: true,

    }),

  );

  // ENABLE CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);

  console.log('Library API running on http://localhost:3000');

}

bootstrap();