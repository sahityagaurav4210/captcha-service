import { INestApplication } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { GlobalInterceptor } from 'src/packages';

class AppConfigurer {
  public static configure(app: INestApplication): INestApplication {
    app.enableCors({ origin: '*' });
    app.use((request: Request, response: Response, next: NextFunction) => {
      request.app.set('trust proxy', true);
      next();
    });
    app.useGlobalInterceptors(new GlobalInterceptor());
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
