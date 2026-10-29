import { Module, Global } from '@nestjs/common';
import { CAPTCHA_AUDIO_CLIENT, CAPTCHA_CLIENT } from 'src/packages';

import * as svgCaptcha from 'svg-captcha';
import * as nodePath from 'node:path';

const gtts = require('node-gtts');

@Global()
@Module({
  providers: [
    {
      provide: CAPTCHA_CLIENT,
      useFactory: () => {
        const fontUrl = nodePath.resolve(__dirname, '../../assets/fonts/captcha-font.ttf');
        svgCaptcha.loadFont(fontUrl);

        return svgCaptcha;
      },
    },

    {
      provide: CAPTCHA_AUDIO_CLIENT,
      useFactory: () => {
        const tts = gtts('en');
        return tts;
      },
    },
  ],
  exports: [CAPTCHA_CLIENT, CAPTCHA_AUDIO_CLIENT],
})
export class CaptchaModule {}
