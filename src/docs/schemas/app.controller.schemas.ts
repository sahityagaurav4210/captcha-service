export class AppControllerSchemas {
  public static readonly APP_INFO_RESPONSE_SCHEMA = {
    type: 'string',
    example: 'Captcha Service v0.0.1 © 2025 Gaurav Sahitya. All rights reserved.',
  };

  public static readonly APP_ERROR_RESPONSE_SCHEMA = {
    type: 'object',
    properties: {
      status: { type: 'string', example: 'exception' },
      message: { type: 'string', example: 'Api operation failed' },
      details: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Internal Server Error' },
        },
      },
      clientInfo: { type: 'string', example: '127.0.0.1' },
    },
  };

  public static readonly PING_API_RESPONSE_SCHEMA = {
    type: 'object',
    properties: {
      status: { type: 'string', example: 'success' },
      message: { type: 'string', example: 'Api is operational' },
      details: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'pong' },
        },
      },
      clientInfo: { type: 'string', example: '127.0.0.1' },
    },
  };
}
