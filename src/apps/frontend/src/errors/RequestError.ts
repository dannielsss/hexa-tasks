export default class RequestError<M> extends Error {
  public readonly dataError: M;

  constructor(message: string, dataError: M) {
    super(message);
    this.dataError = dataError;
  }
}
