import { Response } from 'express';

export const success = <T>(res: Response, data: T, status: number) => {
  res.status(status).json({ success: true, data });
};

export const error = <T>(res: Response, data: T, status: number) => {
  res.status(status).json({ success: false, data });
};
