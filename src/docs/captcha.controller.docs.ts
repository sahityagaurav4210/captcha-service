export class CaptchaControllerDocs {
  public static readonly CAPTCHA_GENERATE_OK_DESC: string =
    'It signifies a successful response from the server and returns the newly generated **captcha uri** and its **captcha id**. Please note that in production a code will come as a value to message property, please refer official documentation for interpretation of all codes.';

  public static readonly CAPTCHA_IMAGE_OK_DESC: string =
    'It signifies a successful response from the server and returns a captcha image of the specified captcha id.';

  public static readonly CAPTCHA_IMAGE_BADREQ_DESC: string =
    "It signifies a 'bad request' response from the server. This api usually gives this type of response when either the specified **CaptchaId** is invalid or it has been expired.";

  public static readonly CAPTCHA_ERROR_DESC: string =
    "It signifies an error response from the server (usually a 500 status code). It usually occurs when there has something bad happened at server side's code.";

  public static readonly CAPTCHA_IMAGE_CAPTCHAID_PARAM_DESC: string =
    'Please specify the captcha id which has been given to you by captcha generate api.';

  public static readonly CAPTCHA_AUDIO_OK_DESC: string =
    'It signifies a successful response from the server and returns a captcha audio of the specified captcha id.';

  public static readonly VALIDATES_CAPTCHA_OK_DESC: string =
    'It signifies a successful response from the server and returns a verified captcha verification status in its response body.';

  public static readonly VALIDATES_CAPTCHA_BADREQ_DESC: string =
    'It signifies a bad request (a 400 status code) response from the server. This api usually returns this type of response when either the given **captchaId** is incorrect or it has been expired.';

  public static readonly GET_CAPTCHA_VERIFICATION_STATUS_OK_DESC =
    'It signifies a successful response from the server and a captcha verification status in its response body.';
}
