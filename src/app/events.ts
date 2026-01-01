export class AppGlobalEvents {
  public static initialize() {
    process.on('SIGINT', function (signal: NodeJS.Signals) {
      console.log(`Received signal - ${signal}, aborting the application gracefully`);
      process.exit(0);
    });
  }
}
