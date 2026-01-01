import * as nodePath from 'node:path';
import { FileHelpers } from '../helpers';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { AppConfigurer, SwaggerConfig } from 'src/config';
import { AppGlobalEvents } from './events';

class CaptchaServiceApplication {
  public static async initialize(): Promise<void> {
    const bannerPath = nodePath.resolve(__dirname, '../../assets/banner.txt');
    const infoBannerPath = nodePath.resolve(__dirname, '../../assets/info.txt');
    const infoBannerTxt = await FileHelpers.readFile(infoBannerPath);
    const text = `${infoBannerTxt}\n\n© 2025, Gaurav Sahitya | v${process.env.APP_VERSION}\nA product of Coding Works, visit www.sgaurav.me\n`;

    const banner = await FileHelpers.readFile(bannerPath);

    await FileHelpers.mkdir(nodePath.resolve(__dirname, '../../logs'));

    if (!(await FileHelpers.ifFileExists(infoBannerPath))) await FileHelpers.writeFile(infoBannerPath, text);

    const app = AppConfigurer.configure(await NestFactory.create(AppModule));

    AppGlobalEvents.initialize();
    SwaggerConfig.configure(app);

    const PORT = AppConfigurer.getPort();
    const HOST = AppConfigurer.getHost();
    const VERSION = AppConfigurer.getVersion();

    const APP_EXT_HOST = process.env.APP_EXT_HOST;
    const testUrl = AppConfigurer.isProduction()
      ? `https://${APP_EXT_HOST}/api/v1/app/ping`
      : `http://${APP_EXT_HOST}:${PORT}/api/v1/app/ping`;
    const message = `Captcha service is running 🚀🚀🚀🚀, and is live at ${testUrl}`;

    await app.listen(PORT, HOST);

    // eslint-disable-next-line no-console
    console.clear();
    console.log(banner);
    console.log(`© 2026, Gaurav Sahitya | v${VERSION}`);
    console.log('A product of Coding Works, visit www.sgaurav.me');
    console.log(message);
  }
}

export default CaptchaServiceApplication;
