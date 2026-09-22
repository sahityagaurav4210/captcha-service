export class GlobalSchema {
  public static readonly GLOBAL_OK_RESPONSE_SCHEMA: Record<string, any> = {
    type: 'object',
    properties: {
      status: { type: 'string', example: 'success' },
      message: { type: 'string', example: 'Api operation was successful' },
      details: { type: 'object', properties: { message: { type: 'string', example: 'Resource created successfully' } } },
      clientInfo: { type: 'string', example: '127.0.0.1' },
    },
  };

  public static readonly GLOBAL_VALIDATION_RESPONSE_SCHEMA: Record<string, any> = {
    type: 'object',
    properties: {
      status: { type: 'string', example: 'validation' },
      message: { type: 'string', example: 'Api operation has failed' },
      details: { type: 'object', properties: { message: { type: 'string', example: 'Bad request' } } },
      clientInfo: { type: 'string', example: '127.0.0.1' },
    },
  };

  public static readonly GLOBAL_ERROR_RESPONSE_SCHEMA: Record<string, any> = {
    type: 'object',
    properties: {
      status: { type: 'string', example: 'error' },
      message: { type: 'string', example: 'Api operation has failed' },
      details: { type: 'object', properties: { message: { type: 'string', example: 'Something bad has happened.' } } },
      clientInfo: { type: 'string', example: '127.0.0.1' },
    },
  };
}
