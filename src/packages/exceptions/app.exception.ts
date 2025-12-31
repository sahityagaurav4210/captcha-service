import ApiClient from 'src/api/app.api';

export class AppException extends Error {
  readonly errorObject: Record<string, any>;

  constructor(reply: ApiClient, status: number) {
    super(reply.MESSAGE);
    this.name = 'AppException';
    this.errorObject = { ...reply, HTTP_CODE: status };
  }
}
