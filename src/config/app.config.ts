import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import ApiClient from 'src/api/app.api';
import { ApiStatus, GlobalInterceptor } from 'src/packages';

class AppConfigurer {
  public static configure(app: INestApplication): INestApplication {
    app.enableCors({ origin: '*' });

    app.use((request: Request, response: Response, next: NextFunction) => {
      request.app.set('trust proxy', true);
      next();
    });

    app.useGlobalInterceptors(new GlobalInterceptor());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: (validationErrors = []) => {
          // Extract all validation error messages from the DTO
          const errors = validationErrors
            .map((error) => Object.values(error.constraints || {}))
            .flat()
            .join(', ');

          // Create your custom reply structure
          const reply = new ApiClient();
          reply.STATUS = ApiStatus.VALIDATION; // Or ApiStatus.VALIDATION
          reply.MESSAGE = 'Payload validation failed';
          reply.DETAILS = { message: errors }; // e.g., "Captcha must be string"

          // Throw it so it matches your standard error format
          return new BadRequestException(reply);
        },
      }),
    );
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    return app;
  }

  public static getVersion(): string {
    return process.env.APP_VERSION || '1.0.0';
  }

  public static getEnvironment(): string {
    return process.env.NODE_ENV || 'development';
  }

  public static isProduction(): boolean {
    return this.getEnvironment().trim().toLowerCase() === 'production';
  }

  public static getPort(): number {
    return Number(process.env.PORT) || 3000;
  }

  public static getHost(): string {
    return process.env.HOST || 'localhost';
  }
}

export { AppConfigurer };
