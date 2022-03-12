import { IError } from '@shared/helpers/errors.helper';

export class CustomException {
  NotFound() {
    const error: IError = new Error('Not found');
    error.status = 404;
    return error;
  }

  InternalError(err: IError) {
    const error: IError = new Error(err.name);
    error.status = err.status;
    error.stack = err.stack;
    error.message = err.message;
    return error;
  }
}
