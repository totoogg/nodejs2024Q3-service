import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { tap } from 'rxjs';
import { CustomLogger } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private customLogger: CustomLogger) {}
  intercept(context: ExecutionContext, next: CallHandler) {
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
        Object.keys(body).length !== 0 ? ', body: ' + JSON.stringify(body) : ''
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
}
