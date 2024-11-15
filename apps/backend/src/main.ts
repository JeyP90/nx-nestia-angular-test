import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { NestiaSwaggerComposer } from '@nestia/sdk';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  const swaggerPrefix = 'docs';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  const swaggerDoc = await NestiaSwaggerComposer.document(app, {
      openapi: '3.1',
      beautify: true,
      additional: true,
      servers: [
          {
              url: `http://localhost:${port}`,
              description: 'Localhost',
          },
      ],
  });
  SwaggerModule.setup(swaggerPrefix, app, swaggerDoc as OpenAPIObject);

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`🍺 Swagger is running on: http://localhost:${port}/${swaggerPrefix}`);
}

bootstrap();
