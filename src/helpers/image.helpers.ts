import sharp from 'sharp';
import { CAPTCHA_HEIGHT, CAPTCHA_WIDTH } from 'src/packages';

export class ImageHelpers {
  public static async convertSvgIntoPng(svgData: string): Promise<Buffer> {
    const buffer = await sharp(Buffer.from(svgData))
      .resize(CAPTCHA_WIDTH, CAPTCHA_HEIGHT, { fit: 'cover' })
      .png()
      .toBuffer();
    return buffer;
  }
}
