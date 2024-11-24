import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './logger/logger.service';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  const PORT =
    process.env.PORT && Number(process.env.PORT) >= 0
      ? Number(process.env.PORT)
      : 4000;

  app.useGlobalPipes(new ValidationPipe());

  const log = app.get(CustomLogger);

  app.useLogger(log);

  try {
    const fileYaml = await readFile(
      join(__dirname, '..', 'doc', 'api.yaml'),
      'utf8',
    );
    const config = yaml.load(fileYaml) as OpenAPIObject;

    SwaggerModule.setup('doc', app, config);
  } catch (error) {
    log.error(error);
  }

  await app.listen(PORT, async () => {
    log.log(`Application is running on ${PORT} port`);
  });

  log.error('error logger set');
  log.warn('warn logger set');
  log.log('log logger set');
  log.debug('debug logger set');
  log.verbose('verbose logger set');

  process.on('uncaughtException', (error, origin) => {
    log.error(`Captured ${origin} error: ${error.message}`);
  });

  process.on('unhandledRejection', async (reason: Error) => {
    log.error(`Unhandled rejection detected: ${reason.message}`);
  });

  //To check for uncaughtException and unhandledRejection errors, uncomment the code below

  /* 
  setTimeout(() => {
    throw new Error('Oops! Exception');
  }, 500);

  setTimeout(() => {
    Promise.reject(new Error('Oops! Rejection'));
  }, 500); 
  */
}

bootstrap();
