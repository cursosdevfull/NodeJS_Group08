import { NextFunction, Request, Response } from 'express';
import logger from './logging.helper';
import { Trace } from './trace.helper';

export interface IError extends Error {
  status?: number;
  code?: string;
}

export default class {
  static notFound(req: Request, res: Response, next: NextFunction): void {
    const error: IError = new Error('Path not found');
    error.name = 'Error Path not found';
    error.status = 404;

    next(error);
  }

  static catchError(
    ftn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      return ftn(req, res, next).catch((err) => {
        const error: IError = new Error('Async error');
        error.name = err.status ? 'Async error' : 'Database error';
        error.message = err.message;
        error.stack = err.stack;
        error.status = err.status ? err.status : 503;

        next(error);
      });
    };
  }

  static generic(
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const objError: IError = {
      name: error.name,
      status: error.status ? error.status : 500,
      message: error.message,
    };

    if (process.env.NODE_ENV !== 'production') {
      objError.stack = error.stack;
    }

    logger.error({ traceId: Trace.getTraceId(), error: objError });

    res.status(error.status ? error.status : 500).json(objError);
  }
}
