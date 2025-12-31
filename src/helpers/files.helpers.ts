import * as fs from 'node:fs/promises';

class FileHelpers {
  public static async readFile(filePath: string): Promise<string> {
    return (await fs.readFile(filePath, 'utf-8')).toString();
  }

  public static async writeFile(filePath: string, data: string): Promise<void> {
    await fs.writeFile(filePath, data, 'utf-8');
  }

  public static async mkdir(dirPath: string): Promise<void> {
    await fs.mkdir(dirPath, { recursive: true });
  }

  public static async ifFileExists(filePath: string): Promise<boolean> {
    return fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);
  }
}

export { FileHelpers };
