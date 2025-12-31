import { ApiReply } from 'src/interfaces';
import { ApiStatus } from 'src/packages';

class ApiClient {
  private static readonly apiBaseUrl: string = '/api/v1';

  constructor(
    private status?: ApiStatus,
    private message?: string,
    private clientInfo?: string,
    private details?: ApiReply,
  ) {}

  public get STATUS(): ApiStatus | undefined {
    return this.status;
  }

  public get MESSAGE(): string | undefined {
    return this.message;
  }

  public get CLIENT_INFO(): string | undefined {
    return this.clientInfo;
  }

  public get DETAILS(): ApiReply | undefined {
    return this.details;
  }

  public static get API_BASE_URL(): string {
    return this.apiBaseUrl;
  }

  public set STATUS(status: ApiStatus) {
    this.status = status;
  }

  public set MESSAGE(message: string) {
    this.message = message;
  }

  public set CLIENT_INFO(clientInfo: string) {
    this.clientInfo = clientInfo;
  }

  public set DETAILS(details: ApiReply) {
    this.details = details;
  }
}

export default ApiClient;
