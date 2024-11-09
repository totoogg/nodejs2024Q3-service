import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

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

  await app.listen(PORT);
}
bootstrap();
