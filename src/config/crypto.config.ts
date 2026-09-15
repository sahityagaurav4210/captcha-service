import * as crypto from 'node:crypto';

export class Crypto {
  private static vector: Buffer;

  public static async getGlobalCryptoConfigs() {
    if (!this.vector) {
      this.vector = crypto.randomBytes(16);
    }

    return this.vector;
  }
}
