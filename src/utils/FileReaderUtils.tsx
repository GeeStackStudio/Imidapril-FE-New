export default class FileReaderUtils {
  static readAsBinaryString(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(blob);
      fileReader.onload = (e) => e.target && resolve(e.target.result as string);
      fileReader.onerror = (e) => reject(e);
    });
  }
}
