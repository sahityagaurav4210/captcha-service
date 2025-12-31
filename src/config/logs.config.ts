import { WinstonModule } from 'nest-winston';

import * as winston from 'winston';
import * as nodePath from 'node:path';

export class AppLogsConfig {
  public static configure() {
    const combinedLogPath = nodePath.resolve(__dirname, '../../logs/combined.log');
    const errorLogPath = nodePath.resolve(__dirname, '../../logs/error.log');

    return WinstonModule.forRoot({
      level: 'info',

      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),

      transports: [
        new winston.transports.File({
          filename: combinedLogPath,
        }),

        new winston.transports.File({
          filename: errorLogPath,
          level: 'error',
        }),
      ],
    });
  }
}
