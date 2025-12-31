import { Test, TestingModule } from '@nestjs/testing';
import ApiClient from 'src/api/app.api';
import { AppController } from 'src/controllers';
import { ApiStatus } from 'src/packages';
import { AppService } from 'src/services';

describe('AppController', () => {
  let appController: AppController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe(`${ApiClient.API_BASE_URL}/app/ping api test cases`, () => {
    it('should be an instance of ApiClient', () => {
      const ipAddress = '127.0.0.1';
      expect(appController.ping(ipAddress)).toBeInstanceOf(ApiClient);
    });

    it('should return "Pong" as a message and other details as expected', () => {
      const ipAddress = '127.0.0.1';

      expect(appController.ping(ipAddress).DETAILS?.message).toBe('pong');
      expect(appController.ping(ipAddress).STATUS).toBe(ApiStatus.SUCCESS);
      expect(appController.ping(ipAddress).MESSAGE).toBe('Api is operational');
      expect(appController.ping(ipAddress).CLIENT_INFO).toBe(ipAddress);
    });
  });
});
