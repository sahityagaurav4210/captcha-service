import { Controller, Get, HttpCode, HttpStatus, Inject, Ip, Logger } from '@nestjs/common';
import ApiClient from 'src/api/app.api';
import { ApiStatus, SwaggerApiOperationSummaries, SwaggerControllerTags } from 'src/packages';
import { AppService } from 'src/services';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppControllerDocs, AppControllerSchemas } from 'src/docs';

@ApiTags(SwaggerControllerTags.APP_CONTROLLER_TAG)
@Controller(`${ApiClient.API_BASE_URL}/app/`)
export class AppController {
  constructor(
    private readonly appServices: AppService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @ApiOperation({
    summary: SwaggerApiOperationSummaries.PING_API,
    description: SwaggerApiOperationSummaries.PING_API_DESC,
  })
  @ApiOkResponse({
    description: AppControllerDocs.PING_API_OK_DESC,
    content: { 'application/json': { schema: AppControllerSchemas.PING_API_RESPONSE_SCHEMA } },
  })
  @ApiInternalServerErrorResponse({
    description: AppControllerDocs.APP_INTERNAL_SERVER_ERROR_DESC,
    content: { 'application/json': { schema: AppControllerSchemas.APP_ERROR_RESPONSE_SCHEMA } },
  })
  @HttpCode(HttpStatus.OK)
  @Get('ping')
  public ping(@Ip() ipAddress: string): ApiClient {
    const reply = new ApiClient();
    const message = this.appServices.ping();

    this.logger.log(`Responding '${message}' to user bearing identity - ${ipAddress}`, {
      origin: 'AppController:ping',
    });

    reply.STATUS = ApiStatus.SUCCESS;
    reply.MESSAGE = 'Api is operational';
    reply.DETAILS = { message };
    reply.CLIENT_INFO = ipAddress;

    return reply;
  }
}
