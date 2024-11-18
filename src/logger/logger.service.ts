import {
  LoggerService,
  Injectable,
  ConsoleLogger,
  LogLevel,
} from '@nestjs/common';

@Injectable()
export class CustomLogger extends ConsoleLogger implements LoggerService {
  private logLevels = [
    'error',
    'warn',
    'log',
    'debug',
    'verbose',
  ] as LogLevel[];
  private logLevel = 0;
  private fileSize = 0;

  constructor() {
    super();

    this.logLevel =
      process.env.LOG_LEVEL && Number(process.env.LOG_LEVEL) >= 0
        ? Number(process.env.LOG_LEVEL)
        : 2;
    this.fileSize =
      process.env.FILE_LOG_SIZE && Number(process.env.FILE_LOG_SIZE) >= 0
        ? Number(process.env.FILE_LOG_SIZE)
        : 20;

    this.setLogLevels(this.logLevels.slice(0, this.logLevel + 1));
  }

  log(message: string) {
    this.textForRecord('LOG', message);

    super.log(message);
  }

  error(message: string) {
    this.textForRecord('ERROR', message);

    super.error(message);
  }

  warn(message: string) {
    this.textForRecord('WARN', message);

    super.warn(message);
  }

  debug(message: string) {
    this.textForRecord('DEBUG', message);

    super.debug(message);
  }

  verbose(message: string) {
    this.textForRecord('VERBOSE', message);

    super.verbose(message);
  }

  private textForRecord(level: string, text: string) {
    console.log(`${this.getTimestamp()} ${level} ${text}`);
  }
}
