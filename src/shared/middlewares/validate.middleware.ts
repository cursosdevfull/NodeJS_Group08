import { IError } from '../../shared/helpers/errors.helper';
import { Request, Response, NextFunction } from 'express';

export class Validators {
  static validate(schema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
      const originData = ['body', 'params', 'query', 'headers'];

      const listValidations: Array<Promise<any>> = [];

      originData.forEach((origin: string) => {
        if (schema[origin]) {
          switch (origin) {
            case 'body':
              console.log('BODY');
              listValidations.push(schema[origin].validate(req.body));
              break;
            case 'params':
              listValidations.push(schema[origin].validate(req.params));
              break;
            case 'query':
              listValidations.push(schema[origin].validate(req.query));
              break;
            case 'headers':
              listValidations.push(schema[origin].validate(req.headers));
              break;
          }
        }
      });

      Promise.all(listValidations).then((results) => {
        for (const result of results) {
          if (result.error) {
            const err: IError = new Error('Error in parameters');
            err.status = 411;
            err.message = 'Parameters are not valid';
            err.stack = result.error;
            next(err);
          }
        }

        next();
      });
    };
  }
}
