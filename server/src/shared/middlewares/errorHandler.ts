import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/appError';
import { ZodError } from 'zod';
import AppLogger from '../../core/logger';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  AppLogger.error(err.message, err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json(err.serializeError());
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      message: err.issues.map((issue) => issue.message),
      code: 400,
    });
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    res.status(500).json({
      error: err,
      code: 500,
    });
    return;
  }

  res.status(500).json({
    error: 'Something went wrong!',
    code: 500,
  });

  return;
};

export default errorHandler;
