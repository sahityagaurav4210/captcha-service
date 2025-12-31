export class AppControllerDocs {
  public static readonly APP_INFO_OK_DESC: string =
    'Returns the application information such as version, copyright, and other metadata.';
  public static readonly APP_INFO_INTERNAL_SERVER_ERROR_DESC: string =
    'Returns an internal server error response when the application information cannot be retrieved due to unexpected issues.';

  public static readonly PING_API_OK_DESC: string =
    "Returns a simple 'pong' message to indicate that the service is operational.";
  public static readonly APP_INTERNAL_SERVER_ERROR_DESC: string =
    'Returns an internal server error response when the API operation fails due to unexpected issues.';
}
