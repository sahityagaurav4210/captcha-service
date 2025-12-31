import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Inject, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import ApiClient from 'src/api/app.api';
import { ApiStatus } from '../constants/api.constants';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch()
export class GeneralException implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const reply = new ApiClient();

    const res = exception.getResponse ? exception.getResponse() : {};
    const message = exception?.message || 'An error occurred';
    const httpCode = res?.errorObject?.HTTP_CODE || HttpStatus.INTERNAL_SERVER_ERROR;

    reply.STATUS = res?.errorObject?.STATUS || ApiStatus.EXCEPTION;
    reply.MESSAGE = 'Api operation failed';
    reply.DETAILS = res?.DETAILS || { message };
    reply.CLIENT_INFO = request.ip || '0.0.0.0';

    this.logger.error(`General Exception: ${message}`, {
      origin: 'GeneralException:catch',
      requestIp: request.ip,
      status: reply.STATUS,
    });
    return response.status(httpCode).json(reply);
  }
}
