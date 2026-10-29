import * as nodePath from 'node:path';

import { Controller, Get, HttpCode, HttpStatus, Inject, Ip, Res, UseInterceptors } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppInfoInterceptor, SwaggerApiOperationSummaries, SwaggerControllerTags } from 'src/packages';
import { Logger } from 'winston';
import { AppControllerDocs, AppControllerSchemas } from 'src/docs';
import type { Response } from 'express';

@ApiTags(SwaggerControllerTags.HOME_CONTROLLER_TAG)
@Controller()
export class HomeController {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

  @ApiOperation({
    summary: SwaggerApiOperationSummaries.GET_APP_INFO,
    description: SwaggerApiOperationSummaries.GET_APP_INFO_DESC,
  })
  @ApiOkResponse({
    description: AppControllerDocs.APP_INFO_OK_DESC,
    content: { 'text/plain': { schema: AppControllerSchemas.APP_INFO_RESPONSE_SCHEMA } },
  })
  @ApiInternalServerErrorResponse({
    description: AppControllerDocs.APP_INFO_INTERNAL_SERVER_ERROR_DESC,
    content: { 'application/json': { schema: AppControllerSchemas.APP_ERROR_RESPONSE_SCHEMA } },
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AppInfoInterceptor)
  @Get()
  public async getAppInfo(@Ip() ipAddress: string, @Res() response: Response): Promise<void> {
    const infoBannerPath = nodePath.resolve(__dirname, '../../assets/info.txt');

    this.logger.log(`Serving info.txt file to user bearing identity - ${ipAddress}`, {
      origin: 'AppController:getAppInfo',
    });
    return response.sendFile(infoBannerPath);
  }
}
