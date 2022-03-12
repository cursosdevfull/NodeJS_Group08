import { ErrorResponse } from "../../interfaces/error-response.interface";
import { IPayload } from "../../interfaces/payload.interface";
import { UserService } from "../../../user/application/user.service";
import { Request, Response, NextFunction } from "express";

export class AuthenticationGuard {
  static canActivate(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    const authorizationHeader = headers["authorization"];
    if (!authorizationHeader) {
      const error: ErrorResponse = new Error("Unauthorized");
      error.status = 401;
      next(error);
    }

    const parts = authorizationHeader.split(" ");
    if (!(parts.length > 1 && parts[0].toLowerCase() === "bearer")) {
      const error: ErrorResponse = new Error("Unauthorized");
      error.status = 401;
      next(error);
    }

    UserService.validateAccessToken(parts[1]).then(
      (payload: IPayload) => {
        res.locals.payload = payload;
        next();
      },
      (error: ErrorResponse) => {
        next(error);
        //res.status(error.status).send(error.message);
      }
    );
  }
}
