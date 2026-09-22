import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Ip,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import type { Response } from 'express';
import ApiClient from 'src/api/app.api';
import { CaptchaValidateRequestDTO } from 'src/data/requests/CaptchaValidateRequest';
import { CaptchaControllerDocs } from 'src/docs/captcha.controller.docs';
import { CaptchaControllerSchema } from 'src/docs/schemas/captcha.controller.schema';
import { GlobalSchema } from 'src/docs/schemas/global.schema';
import { ApiStatus, SwaggerApiOperationSummaries, SwaggerControllerTags } from 'src/packages';
import { CaptchaService } from 'src/services';

@ApiTags(SwaggerControllerTags.CAPTCHA_CONTROLLER_TAG)
@Controller(`${ApiClient.API_BASE_URL}/captcha/`)
export class CaptchaController {
  constructor(@Inject() private readonly captchaService: CaptchaService) {}

  @ApiOperation({
    summary: SwaggerApiOperationSummaries.CAPTCHA_GENERATE_API,
    description: SwaggerApiOperationSummaries.GET_CAPTCHA_GENERATE_API_DESC,
  })
  @ApiOkResponse({
    description: CaptchaControllerDocs.CAPTCHA_GENERATE_OK_DESC,
    content: { 'image/png': { schema: CaptchaControllerSchema.CAPTCHA_GENERATE_OK_RESPONSE_SCHEMA } },
  })
  @ApiInternalServerErrorResponse({
    description: CaptchaControllerDocs.CAPTCHA_ERROR_DESC,
    content: { 'application/json': { schema: GlobalSchema.GLOBAL_ERROR_RESPONSE_SCHEMA } },
  })
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

  @ApiOperation({
    summary: SwaggerApiOperationSummaries.CAPTCHA_IMAGE_API,
    description: SwaggerApiOperationSummaries.GET_CAPTCHA_IMG_API_DESC,
  })
  @ApiOkResponse({
    description: CaptchaControllerDocs.CAPTCHA_IMAGE_OK_DESC,
    content: { 'image/png': { schema: CaptchaControllerSchema.CAPTCHA_IMAGE_API_OK_RESPONSE } },
  })
  @ApiBadRequestResponse({
    description: CaptchaControllerDocs.CAPTCHA_IMAGE_BADREQ_DESC,
    content: { 'application/json': { schema: GlobalSchema.GLOBAL_VALIDATION_RESPONSE_SCHEMA } },
  })
  @ApiInternalServerErrorResponse({
    description: CaptchaControllerDocs.CAPTCHA_ERROR_DESC,
    content: { 'application/json': { schema: GlobalSchema.GLOBAL_ERROR_RESPONSE_SCHEMA } },
  })
  @ApiParam({
    description: CaptchaControllerDocs.CAPTCHA_IMAGE_CAPTCHAID_PARAM_DESC,
    name: 'captchaId',
    required: true,
    type: String,
  })
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

  @ApiOperation({
    summary: SwaggerApiOperationSummaries.CAPTCHA_AUDIO_API,
    description: SwaggerApiOperationSummaries.GET_CAPTCHA_AUDIO_API_DESC,
  })
  @ApiParam({
    description: CaptchaControllerDocs.CAPTCHA_IMAGE_CAPTCHAID_PARAM_DESC,
    name: 'captchaId',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: CaptchaControllerDocs.CAPTCHA_AUDIO_OK_DESC,
    content: { 'audio/mpeg': { schema: CaptchaControllerSchema.CAPTCHA_AUDIO_API_OK_RESPONSE } },
  })
  @ApiBadRequestResponse({
    description: CaptchaControllerDocs.CAPTCHA_IMAGE_CAPTCHAID_PARAM_DESC,
    content: { 'application/json': { schema: GlobalSchema.GLOBAL_VALIDATION_RESPONSE_SCHEMA } },
  })
  @ApiInternalServerErrorResponse({
    description: CaptchaControllerDocs.CAPTCHA_ERROR_DESC,
    content: { 'application/json': { schema: GlobalSchema.GLOBAL_ERROR_RESPONSE_SCHEMA } },
  })
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

  @ApiOperation({
    summary: SwaggerApiOperationSummaries.CAPTCHA_VALIDATE_API,
    description: SwaggerApiOperationSummaries.VALIDATES_CAPTCHA_API_DESC,
  })
  @ApiOkResponse({
    description: CaptchaControllerDocs.VALIDATES_CAPTCHA_OK_DESC,
    content: { 'application/json': { schema: CaptchaControllerSchema.VALIDATES_CAPTCHA_OK_RESPONSE_SCHEMA } },
  })
  @ApiBadRequestResponse({
    description: CaptchaControllerDocs.VALIDATES_CAPTCHA_BADREQ_DESC,
    content: { 'application/json': { schema: GlobalSchema.GLOBAL_VALIDATION_RESPONSE_SCHEMA } },
  })
  @ApiInternalServerErrorResponse({
    description: CaptchaControllerDocs.CAPTCHA_ERROR_DESC,
    content: { 'application/json': { schema: GlobalSchema.GLOBAL_ERROR_RESPONSE_SCHEMA } },
  })
  @HttpCode(HttpStatus.OK)
  @Post('validate')
  public async handleValidateCaptchaReq(@Body() validateCaptchaRequest: CaptchaValidateRequestDTO, @Ip() ipAddress: string) {
    const reply = new ApiClient();
    const { data } = await this.captchaService.validateCaptcha(ipAddress, validateCaptchaRequest);

    reply.STATUS = ApiStatus.SUCCESS;
    reply.MESSAGE = 'Api operation was successful';
    reply.DETAILS = { message: data?.message };
    reply.CLIENT_INFO = ipAddress;

    return reply;
  }

  @ApiOperation({
    summary: SwaggerApiOperationSummaries.GET_CAPTCHA_VERIFICATION_STATUS_API,
    description: SwaggerApiOperationSummaries.GET_CAPTCHA_VERIFICATION_STATUS_API_DESC,
  })
  @ApiOkResponse({
    description: CaptchaControllerDocs.GET_CAPTCHA_VERIFICATION_STATUS_OK_DESC,
    content: { 'application/json': { schema: CaptchaControllerSchema.GET_CAPTCHA_VERIFICATION_STATUS_OK_RESPONSE_SCHEMA } },
  })
  @ApiBadRequestResponse({
    description: CaptchaControllerDocs.VALIDATES_CAPTCHA_BADREQ_DESC,
    content: { 'application/json': { schema: GlobalSchema.GLOBAL_VALIDATION_RESPONSE_SCHEMA } },
  })
  @ApiInternalServerErrorResponse({
    description: CaptchaControllerDocs.CAPTCHA_ERROR_DESC,
    content: { 'application/json': { schema: GlobalSchema.GLOBAL_ERROR_RESPONSE_SCHEMA } },
  })
  @ApiParam({
    description: CaptchaControllerDocs.CAPTCHA_IMAGE_CAPTCHAID_PARAM_DESC,
    name: 'captchaId',
    required: true,
    type: String,
  })
  @HttpCode(HttpStatus.OK)
  @Get('status/:captchaId')
  public async handleGetCaptchaVerificationStatus(
    @Param('captchaId', new DefaultValuePipe(Number.MIN_SAFE_INTEGER), ParseIntPipe) captchaId: number,
    @Ip() ipAddress: string,
  ) {
    const reply = new ApiClient();
    const { data } = await this.captchaService.getCaptchaVerificationStatus(ipAddress, captchaId);

    reply.STATUS = ApiStatus.SUCCESS;
    reply.MESSAGE = 'Api operation was successful';
    reply.DETAILS = { message: 'cs-gcvs-ok-01', details: data };
    reply.CLIENT_INFO = ipAddress;

    return reply;
  }
}
