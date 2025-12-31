import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  SWAGGER_API_DOC_URL,
  SWAGGER_APP_DESCRIPTION,
  SWAGGER_APP_TITLE,
  SWAGGER_APP_VERSION,
  SWAGGER_AUTHOR_EMAIL,
  SWAGGER_AUTHOR_NAME,
  SWAGGER_AUTHOR_URL,
} from 'src/packages';

export class SwaggerConfig {
  public static configure(app: INestApplication): void {
    const PORT = process.env.PORT || '3000';

    const config = new DocumentBuilder()
      .setTitle(SWAGGER_APP_TITLE)
      .setDescription(SWAGGER_APP_DESCRIPTION)
      .setVersion(SWAGGER_APP_VERSION)
      .setContact(SWAGGER_AUTHOR_NAME, SWAGGER_AUTHOR_URL, SWAGGER_AUTHOR_EMAIL)
      .setLicense('PROPRIETARY LICENSE', './LICENSE.txt')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    document.servers = [{ url: `http://localhost:${PORT}`, description: 'Local Development Server' }];

    SwaggerModule.setup(SWAGGER_API_DOC_URL, app, document, {
      customSiteTitle: 'Coding Works || Captcha Service',
      explorer: true,
    });
  }
}
