import { CAPTCHA_HEIGHT, CAPTCHA_WIDTH } from 'src/packages';

export function getCaptchaImgConfig(captchaLen: number): Record<string, any> {
  return {
    size: captchaLen,
    noise: captchaLen + 4,
    color: false,
    background: '#475569',
    ignoreChars: '(){}[]/',
    width: CAPTCHA_WIDTH,
    height: CAPTCHA_HEIGHT,
    fontSize: 48,
  };
}
