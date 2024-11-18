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
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  const PORT =
    process.env.PORT && Number(process.env.PORT) >= 0
      ? Number(process.env.PORT)
      : 4000;

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

  const log = app.get(CustomLogger);

  app.useLogger(log);

  await app.listen(PORT, async () => {
    log.log(`Application is running on ${PORT} port`);
  });

  log.error('error logger set');
  log.warn('warn logger set');
  log.log('log logger set');
  log.verbose('verbose logger set');
  log.debug('debug logger set');
}
bootstrap();
