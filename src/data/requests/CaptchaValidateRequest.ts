import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CaptchaValidateRequestDTO {
  @ApiProperty({ description: 'Captcha entered by the user', maxLength: 8 })
  @IsString({ message: 'Captcha must be string' })
  @MaxLength(8, { message: 'Invalid captcha, it can be of atmost 8 characters' })
  captcha!: string;

  @ApiProperty({ description: 'Captcha Id given by the captcha generate api.' })
  @IsString({ message: 'Captcha Id must be string' })
  captchaId!: string;
}
