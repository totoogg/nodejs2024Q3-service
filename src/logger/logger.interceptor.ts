import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { tap } from 'rxjs';
import { CustomLogger } from './logger.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private customLogger: CustomLogger) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const query = req.query;
    const body = req.body;

    this.customLogger.log(
      `Request: {${method ? 'method: ' + JSON.stringify(method) : ''}${
        url ? ', url: ' + JSON.stringify(url) : ''
      }${
        Object.keys(query).length !== 0
          ? ', query: ' + JSON.stringify(query)
          : ''
      }${
        Object.keys(body).length !== 0
          ? ', body: ' + JSON.stringify(await this.formatBody(body))
          : ''
      }}`,
    );

    return next.handle().pipe(
      tap((data) => {
        const res = context.switchToHttp().getResponse();

        this.customLogger.log(
          `Response: {protocol: ${req.protocol}, statusCode: ${res.statusCode}${
            data ? ', data: ' + JSON.stringify(data) : ''
          }}`,
        );
      }),
    );
  }

  private async formatBody(body: { password: string }) {
    const result = { ...body };
    const salt = Number(process.env.CRYPT_SALT || '10');

    if ('password' in result) {
      result.password = await bcrypt.hash(String(result.password), salt);
    }

    return result;
  }
}
