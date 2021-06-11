import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { VerbottenException } from '../Errors/forbidden.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    console.log('except ', exception);

    // eslint-disable-next-line @typescript-eslint/ban-types
    let errormsg: string | null = null;
    if (exception instanceof VerbottenException) {
      //or other custom error types, all should have this.message
      errormsg = exception.message;
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      message: errormsg,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
