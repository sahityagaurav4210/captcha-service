import * as crypto from 'node:crypto';

export class CryptoHelper {
  public static async encrypt(data: string): Promise<string> {
    const passphrase = process.env.PASSPHRASE!;
    const salt = process.env.SALT!;

    const key = crypto.scryptSync(passphrase, salt, 32);
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);

    const tag = cipher.getAuthTag();

    // iv (12) + tag (16) + ciphertext
    return Buffer.concat([iv, tag, encrypted]).toString('hex');
  }

  public static async decrypt(encryptedText: string): Promise<string> {
    const passphrase = process.env.PASSPHRASE!;
    const salt = process.env.SALT!;

    const raw = Buffer.from(encryptedText, 'hex');

    const iv = raw.subarray(0, 12);
    const tag = raw.subarray(12, 28); // 16 bytes
    const ciphertext = raw.subarray(28);

    const key = crypto.scryptSync(passphrase, salt, 32);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);

    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

    return decrypted.toString('utf8');
  }
}
