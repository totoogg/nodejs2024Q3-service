import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { CustomLogger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = Number(process.env.PORT) || 4000;

  app.useGlobalPipes(new ValidationPipe());

  try {
    const fileYaml = await readFile(
      join(__dirname, '..', 'doc', 'api.yaml'),
      'utf8',
    );
    const config = yaml.load(fileYaml) as OpenAPIObject;

    SwaggerModule.setup('doc', app, config);
  } catch (error) {
    console.error(error);
  }

  const customLogger = new CustomLogger('Bootstrap');

  await app.listen(PORT);

  customLogger.log(`Application is running on ${PORT} port`);
}
bootstrap();
