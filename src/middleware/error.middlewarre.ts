import { NextFunction, Request, Response } from 'express';

export function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response<any>,
  _next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: error.message,
    timestamp: new Date(),
  });
}
