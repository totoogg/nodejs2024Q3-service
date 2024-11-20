import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomLogger } from './logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private customLogger: CustomLogger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const path = httpAdapter.getRequestUrl(ctx.getRequest());
    const message =
      httpStatus !== HttpStatus.INTERNAL_SERVER_ERROR
        ? (exception.getResponse() as { message: string[] }).message.join(', ')
        : 'The server encountered an internal error or misconfiguration and was unable to complete your request';
    const responseBody = {
      statusCode: httpStatus,
      message,
      timestamp: new Date().toISOString(),
      path,
    };

    this.customLogger.error(
      `statusCode: ${httpStatus}, url: ${httpAdapter.getRequestUrl(
        ctx.getRequest(),
      )}, message: ${message}`,
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
