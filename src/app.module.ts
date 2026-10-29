import { Module } from '@nestjs/common';
import { AppController, CaptchaController } from './controllers';
import { AppService, CaptchaService } from './services';
import { AppLogsConfig } from './config';
import { APP_FILTER } from '@nestjs/core';
import { ApiException, GeneralException } from './packages';
import { CaptchaModule, RedisModule } from './modules';
import { HomeController } from './controllers/home.controller';

@Module({
  imports: [AppLogsConfig.configure(), RedisModule, CaptchaModule],
  controllers: [HomeController, AppController, CaptchaController],
  providers: [
    { provide: APP_FILTER, useClass: ApiException },
    { provide: APP_FILTER, useClass: GeneralException },
    AppService,
    CaptchaService,
  ],
})
export class AppModule {}
