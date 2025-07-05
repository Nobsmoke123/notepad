import AppError from './appError';
import ErrorConstants from './errorConstants';

export class NotFoundError extends AppError {
  constructor(message = ErrorConstants.NOT_FOUND_EXCEPTION) {
    super(message, 404);
  }

  override serializeError() {
    return {
      message: [this.message],
      code: this.statusCode,
    };
  }
}

export class BadRequestError extends AppError {
  constructor(message = ErrorConstants.BAD_REQUEST_EXCEPTION) {
    super(message, 400);
  }

  override serializeError() {
    return {
      message: [this.message],
      code: this.statusCode,
    };
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = ErrorConstants.UNAUTHORIZED_EXCEPTION) {
    super(message, 401);
  }

  override serializeError() {
    return {
      message: [this.message],
      code: this.statusCode,
    };
  }
}

export class InternalServerError extends AppError {
  constructor(message = ErrorConstants.INTERNAL_SERVER_ERROR) {
    super(message, 500);
  }

  override serializeError() {
    return {
      message: [this.message],
      code: this.statusCode,
    };
  }
}
