interface IAppErrorResponse {
  message: string[];
  code: number;
}

export default abstract class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  abstract serializeError(): IAppErrorResponse;
}
