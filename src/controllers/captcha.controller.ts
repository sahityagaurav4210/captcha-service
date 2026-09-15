import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Ip,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import ApiClient from 'src/api/app.api';
import { ApiStatus } from 'src/packages';
import { CaptchaService } from 'src/services';

@Controller(`${ApiClient.API_BASE_URL}/captcha/`)
export class CaptchaController {
  constructor(@Inject() private readonly captchaService: CaptchaService) {}

  @HttpCode(HttpStatus.OK)
  @Get('generate')
  public async handleGenerateCaptchaReq(@Ip() ipAddress: string): Promise<ApiClient> {
    const reply = new ApiClient();
    const { data } = await this.captchaService.generateCaptcha(ipAddress);

    reply.STATUS = ApiStatus.SUCCESS;
    reply.MESSAGE = 'Api operation was successful';
    reply.DETAILS = { message: 'cs-gc-ok-01', details: data };
    reply.CLIENT_INFO = ipAddress;

    return reply;
  }

  @Get('image/:captchaId')
  public async handleGetCaptchaImgReq(
    @Param('captchaId', new DefaultValuePipe(Number.MIN_SAFE_INTEGER), ParseIntPipe) captchaId: number,
    @Ip() ipAddress: string,
    @Res() response: Response,
  ): Promise<void> {
    const reply = new ApiClient();

    if (captchaId === Number.MIN_SAFE_INTEGER) {
      reply.STATUS = ApiStatus.VALIDATION;
      reply.MESSAGE = 'Api operation failed';
      reply.CLIENT_INFO = ipAddress;
      reply.DETAILS = { message: 'cs-gci-bad-req-01' };

      response.status(HttpStatus.BAD_REQUEST).json(reply);
    }

    const { data } = await this.captchaService.getCaptchaImage(captchaId, ipAddress);

    response.setHeader('Content-Type', 'image/png');
    response.send(data);
  }

  @Get('audio/:captchaId')
  public async handleGetCaptchaAudioReq(
    @Param('captchaId', new DefaultValuePipe(Number.MIN_SAFE_INTEGER), ParseIntPipe) captchaId: number,
    @Ip() ipAddress: string,
    @Res() response: Response,
  ): Promise<void> {
    const reply = new ApiClient();

    if (captchaId === Number.MIN_SAFE_INTEGER) {
      reply.STATUS = ApiStatus.VALIDATION;
      reply.MESSAGE = 'Api operation failed';
      reply.CLIENT_INFO = ipAddress;
      reply.DETAILS = { message: 'cs-gca-bad-req-01' };

      response.status(HttpStatus.BAD_REQUEST).json(reply);
      return;
    }

    await this.captchaService.getCaptchaAudio(captchaId, ipAddress, response);
  }
}
