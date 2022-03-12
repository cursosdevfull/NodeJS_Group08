import { NextFunction, Request, Response } from 'express';

export class AuthorizationGuard {
  static canActivate(...actionsAllowed: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { roles } = res.locals.payload;

      const listActions: string[] = roles
        .map((role: any) => role.actions) // ["USERS_LIST,USERS_INSERT", "MEDICS_LIST"]    "USERS_LIST,USERS_INSERT,MEDICS_LIST"
        .reduce((accum: any, actions: string) => {
          accum += actions;
          return accum;
        }, '') // "USERS_LIST,USERS_INSERT,MEDICS_LIST"
        .split(','); // ["USERS_LIST", "USERS_INSERT", "MEDICS_LIST"]

      const listActionsUnique = [...new Set(listActions)];

      const matched = actionsAllowed.some((action: string) =>
        listActionsUnique.includes(action)
      );

      if (matched) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }

      /* let actionMatched = false;
      for (const action of actionsAllowed) {
        if (listActionsUnique.includes(action)) {
          actionMatched = true;
          break;
        }
      } */
    };
  }
}
