export const SWAGGER_APP_TITLE = 'Captcha Service Backend';
export const SWAGGER_APP_DESCRIPTION =
  '**INTRODUCTION:** <br/><br/> A CAPTCHA `(Completely Automated Public Turing test to tell Computers and Humans Apart)` service is a security tool designed to distinguish between human users and automated bots. By presenting challenges that are easy for people but difficult for machines—such as identifying distorted text, selecting specific objects in images, or simple interaction patterns—these services protect websites from spam, brute-force attacks, and data scraping. This service aims to provide such services to enhance the security and integrity of my **personal** and professional **web applications.** This project is backed by a **proprietary license** which you can see by clicking on the **LICENSE** link provided below. <br/><br/> **ABOUT DEVELOPER:** <br/><br/> This project is developed, maintained, and designed by me i.e., Gaurav Sahitya. I am a software engineer with more than **3** years of experience developing software systems. I am currently working at **C-DAC** (an autonomous scientific society under the Ministry of Electronics and Information Technology, Government of India) in Delhi, India. For more information please click on the **WEBSITE** link provided below.';
export const SWAGGER_APP_VERSION = process.env.APP_VERSION || '1.0.0';
export const SWAGGER_API_DOC_URL = '/app/v1/docs';
export const SWAGGER_AUTHOR_NAME = 'Gaurav Sahitya';
export const SWAGGER_AUTHOR_URL = 'https://www.sgaurav.me';
export const SWAGGER_AUTHOR_EMAIL = 'works.sahitya@gmail.com';

export class SwaggerControllerTags {
  public static readonly APP_CONTROLLER_TAG = 'App Controller';
  public static readonly CAPTCHA_CONTROLLER_TAG = 'Captcha Controller';
  public static readonly HOME_CONTROLLER_TAG = 'Home Controller';
}

export class SwaggerApiOperationSummaries {
  public static readonly GET_APP_INFO = 'Get Application Info';
  public static readonly PING_API = 'Ping API';
  public static readonly CAPTCHA_GENERATE_API = 'Generates a new captcha when requested';
  public static readonly CAPTCHA_IMAGE_API = 'Returns the captcha image of the requested captcha id.';
  public static readonly CAPTCHA_AUDIO_API = 'Returns the captcha audio of the requested captcha id.';
  public static readonly CAPTCHA_VALIDATE_API = 'Validates the given captcha and captcha id.';
  public static readonly GET_CAPTCHA_VERIFICATION_STATUS_API =
    'Returns the captcha verification status of the given captcha id.';

  public static readonly GET_APP_INFO_DESC =
    'Retrieve application information including version and copyright details. Click the **Try it out** button to view the actual response.';
  public static readonly PING_API_DESC =
    'Check the operational status of the service. Click the **Try it out** button to view the actual response.';

  public static readonly GET_CAPTCHA_GENERATE_API_DESC =
    'This api generates the captcha on the fly and returns the relative uri of generated captcha and its captcha id. Click the **Try it out** button to view the actual response.';

  public static readonly GET_CAPTCHA_IMG_API_DESC =
    'This api returns the captcha image as its response of the requested captcha id. Click the **Try it out** button to view its actual response. Please note that image will only be returned in case of successful image retrieval.';

  public static readonly GET_CAPTCHA_AUDIO_API_DESC =
    'This api returns the captcha audio as its response of the requested captcha id. Click the **Try it out** button to view its actual response. Please note that audio file will only be returned in case of successful audio retrieval.';

  public static readonly VALIDATES_CAPTCHA_API_DESC =
    'This api validates the given captcha and captcha id against the stored captcha details and returns the verification status according to it. Click the **Try it out** button to view its actual response.';

  public static readonly GET_CAPTCHA_VERIFICATION_STATUS_API_DESC =
    'This api returns the captcha verification status of the given **captchaId**. Click on **Try it out** button to view its actual response.';
}
