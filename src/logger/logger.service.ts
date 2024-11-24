import {
  LoggerService,
  Injectable,
  ConsoleLogger,
  LogLevel,
} from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';

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
      (process.env.FILE_LOG_SIZE && Number(process.env.FILE_LOG_SIZE) >= 0
        ? Number(process.env.FILE_LOG_SIZE)
        : 20) * 1000;

    this.setLogLevels(this.logLevels.slice(0, this.logLevel + 1));
  }

  async log(message: string) {
    if (!this.isLevelEnabled('log')) return;

    await this.textForRecord('LOG', message);

    super.log(message);
  }

  async error(message: string) {
    if (!this.isLevelEnabled('error')) return;

    await this.textForRecord('ERROR', message);

    super.error(message);
  }

  async warn(message: string) {
    if (!this.isLevelEnabled('warn')) return;

    await this.textForRecord('WARN', message);

    super.warn(message);
  }

  async debug(message: string) {
    if (!this.isLevelEnabled('debug')) return;

    await this.textForRecord('DEBUG', message);

    super.debug(message);
  }

  async verbose(message: string) {
    if (!this.isLevelEnabled('verbose')) return;

    await this.textForRecord('VERBOSE', message);

    super.verbose(message);
  }

  private async textForRecord(level: string, text: string) {
    const message = `${this.getTimestamp()} ${level} ${text}\n`;

    try {
      await fs.access(path.resolve('logs'));
    } catch {
      await fs.mkdir(path.resolve('logs'), {
        recursive: true,
      });
    }

    const dir = await fs.readdir(path.resolve('logs'));

    if (level === 'ERROR') {
      await this.recordFile('error', message, dir);
    } else {
      await this.recordFile('log', message, dir);
    }
  }

  private async recordFile(level: string, text: string, dir: string[]) {
    const fileName = dir
      .filter((el) => {
        const regexp = new RegExp(`${level.toLowerCase()}\\d\*.txt`, 'gim');
        return regexp.test(el);
      })
      .sort(
        (a, b) =>
          Number(
            a
              .split('')
              .filter((el) => Number(el) >= 0)
              .join(''),
          ) -
          Number(
            b
              .split('')
              .filter((el) => Number(el) >= 0)
              .join(''),
          ),
      )
      .at(-1);

    if (fileName) {
      const size = (await fs.stat(path.resolve('logs', fileName))).size;

      if (size < this.fileSize) {
        await fs.appendFile(path.resolve('logs', fileName), text);
      } else {
        const count = Number(
          fileName
            .split('')
            .filter((el) => Number(el) >= 0)
            .join(''),
        );
        await fs.writeFile(
          path.resolve('logs', `${level}${count + 1}.txt`),
          text,
        );
      }
    } else {
      await fs.writeFile(path.resolve('logs', level + '1.txt'), text);
    }
  }
}
