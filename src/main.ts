import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(4000);
}
bootstrap();
