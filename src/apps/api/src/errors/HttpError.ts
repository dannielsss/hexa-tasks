export default class HttpError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message || `HTTP Error ${statusCode}`);
    this.statusCode = statusCode;
  }
}
