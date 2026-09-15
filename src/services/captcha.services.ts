import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import ApiClient from 'src/api/app.api';
import { getCaptchaImgConfig } from 'src/config';
import { CryptoHelper } from 'src/helpers';
import { ImageHelpers } from 'src/helpers/image.helpers';
import { IServiceReply } from 'src/interfaces';
import { ApiStatus, CAPTCHA_AUDIO_CLIENT, CAPTCHA_CLIENT, REDIS_CLIENT } from 'src/packages';
import { Response } from 'express';

@Injectable()
export class CaptchaService {
  constructor(
    @Inject(REDIS_CLIENT) private readonly redisClient: Redis,
    @Inject(CAPTCHA_CLIENT) private readonly captchaClient: any,
    @Inject(CAPTCHA_AUDIO_CLIENT) private readonly captchaAudioClient: any,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  public async generateCaptcha(ipAddress: string): Promise<IServiceReply<Record<string, any>>> {
    let captchaLen = Number(process.env.CAPTCHA_LEN) || 6;

    const svgMetadata = this.captchaClient.create(getCaptchaImgConfig(captchaLen));
    let captcha = svgMetadata.text;
    const keyName = 'captcha_service:captcha';
    const timeout = Number(process.env.CAPTCHA_TIMEOUT) * 60;

    const captchaId = Date.now();
    const token = await CryptoHelper.encrypt(captcha);
    const payload = { token, data: svgMetadata.data, verified: false };
    await this.redisClient.setex(`${keyName}:${captchaId}`, timeout, JSON.stringify(payload));

    this.logger.log(`Captcha - ${captcha} has been generated at ${new Date().toISOString()}`, {
      ip: ipAddress,
      origin: 'CaptchaService::generateCaptcha',
    });
    return { data: { uri: `/captcha/image/${captchaId}`, captchaId } };
  }

  public async getCaptchaImage(captchaId: number, ipAddress: string): Promise<IServiceReply<Buffer>> {
    const reply = new ApiClient();
    const keyName = `captcha_service:captcha:${captchaId}`;
    const stringifiedPayload = await this.redisClient.get(keyName);

    if (!stringifiedPayload) {
      this.logger.log(`Someone hit the captcha image resource with invalid details`, {
        ip: ipAddress,
        origin: 'CaptchaService::getCaptchaImage',
      });

      reply.STATUS = ApiStatus.VALIDATION;
      reply.MESSAGE = 'Api operation failed';
      reply.CLIENT_INFO = ipAddress;
      reply.DETAILS = { message: 'cs-gci-bad-req-02' };

      throw new HttpException(reply, HttpStatus.BAD_REQUEST);
    }

    this.logger.log(`Captcha image belonging to id - ${captchaId} has been served to client successfully.`, {
      ip: ipAddress,
      origin: 'CaptchaService::getCaptchaImage',
    });

    const payload = JSON.parse(stringifiedPayload);
    const captchaImgBuffer = await ImageHelpers.convertSvgIntoPng(payload.data);

    return { data: captchaImgBuffer };
  }

  public async getCaptchaAudio(captchaId: number, ipAddress: string, response: Response) {
    const reply = new ApiClient();
    const keyName = `captcha_service:captcha:${captchaId}`;
    const stringifiedPayload = await this.redisClient.get(keyName);

    if (!stringifiedPayload) {
      this.logger.log(`Someone hit the captcha audio resource with invalid details`, {
        ip: ipAddress,
        origin: 'CaptchaService::getCaptchaAudio',
      });

      reply.STATUS = ApiStatus.VALIDATION;
      reply.MESSAGE = 'Api operation failed';
      reply.CLIENT_INFO = ipAddress;
      reply.DETAILS = { message: 'cs-gca-bad-req-02' };

      response.status(HttpStatus.BAD_REQUEST).json(reply);
      return;
    }

    this.logger.log(`Captcha audio belonging to id - ${captchaId} has been served to client successfully.`, {
      ip: ipAddress,
      origin: 'CaptchaService::getCaptchaAudio',
    });

    const payload = JSON.parse(stringifiedPayload);
    const text = await CryptoHelper.decrypt(payload.token);
    const spaced = text.split('').join(' ');

    response.setHeader('Content-Type', 'audio/mpeg');
    this.captchaAudioClient.stream(spaced).pipe(response);
  }
}
