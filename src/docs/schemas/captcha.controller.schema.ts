export class CaptchaControllerSchema {
  public static readonly CAPTCHA_GENERATE_OK_RESPONSE_SCHEMA: Record<string, any> = {
    type: 'object',
    properties: {
      status: { type: 'string', example: 'success' },
      message: { type: 'string', example: 'Api operation was successful' },
      details: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Captcha generated successfully' },
          details: {
            type: 'object',
            properties: {
              captchaUri: { type: 'string', example: '/captcha/1234567890' },
              captchaId: { type: 'string', example: 1234567890 },
            },
          },
        },
      },
      clientInfo: { type: 'string', example: '127.0.0.1' },
    },
  };

  public static readonly CAPTCHA_IMAGE_API_OK_RESPONSE: Record<string, any> = {
    type: 'string',
    format: 'binary',
  };

  public static readonly CAPTCHA_AUDIO_API_OK_RESPONSE: Record<string, any> = {
    type: 'string',
    format: 'binary',
  };

  public static readonly VALIDATES_CAPTCHA_OK_RESPONSE_SCHEMA: Record<string, any> = {
    type: 'object',
    properties: {
      status: { type: 'string', example: 'success' },
      message: { type: 'string', example: 'Api operation was successful' },
      details: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Captcha validated successfully' },
        },
      },
      clientInfo: { type: 'string', example: '127.0.0.1' },
    },
  };

  public static readonly GET_CAPTCHA_VERIFICATION_STATUS_OK_RESPONSE_SCHEMA: Record<string, any> = {
    type: 'object',
    properties: {
      status: { type: 'string', example: 'success' },
      message: { type: 'string', example: 'Api operation was successful' },
      details: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Captcha verified successfully' },
          details: {
            type: 'object',
            properties: {
              verified: { type: 'boolean', example: true },
            },
          },
        },
      },
      clientInfo: { type: 'string', example: '127.0.0.1' },
    },
  };
}
