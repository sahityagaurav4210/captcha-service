import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { Request } from 'express';
import ApiClient from 'src/api/app.api';
import { ApiStatus } from '../constants/api.constants';
import { AppException } from './app.exception';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch(HttpException)
export class ApiException implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const reply = new ApiClient();

    const status = exception?.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const res = exception?.getResponse() || {};
    const message = exception?.message || 'An error occurred';

    reply.STATUS = res?.STATUS || ApiStatus.EXCEPTION;
    reply.MESSAGE = 'Api operation failed';
    reply.DETAILS = res?.DETAILS || { message };
    reply.CLIENT_INFO = request.ip || '0.0.0.0';

    this.logger.error(`HTTP Exception: ${message}`, { origin: 'ApiException:catch', requestIp: request.ip, status });
    throw new AppException(reply, status);
  }
}
