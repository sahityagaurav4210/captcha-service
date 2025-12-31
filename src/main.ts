import 'dotenv/config';
import CaptchaServiceApplication from './app';

(async function () {
  await CaptchaServiceApplication.initialize();
})();
