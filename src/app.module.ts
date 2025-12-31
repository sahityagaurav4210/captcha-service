import { Module } from '@nestjs/common';
import { AppController } from './controllers';
import { AppService } from './services';
import { AppLogsConfig } from './config';
import { APP_FILTER } from '@nestjs/core';
import { ApiException, GeneralException } from './packages';

@Module({
  imports: [AppLogsConfig.configure()],
  controllers: [AppController],
  providers: [
    { provide: APP_FILTER, useClass: ApiException },
    { provide: APP_FILTER, useClass: GeneralException },
    AppService,
  ],
})
export class AppModule {}
