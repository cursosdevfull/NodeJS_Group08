import { ErrorResponse } from "@shared/interfaces/error-response.interface";
import { IPayload } from "@shared/interfaces/payload.interface";
import { UserService } from "@user/application/user.service";
import { Request, Response, NextFunction } from "express";

export class AuthenticationGuard {
  static canActivate(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    const authorizationHeader = headers["authorization"];
    if (!authorizationHeader) {
      res.status(401).send("Unauthorized");
    }

    const parts = authorizationHeader.split(" ");
    if (!(parts.length > 1 && parts[0].toLowerCase() === "bearer")) {
      res.status(401).send("Unauthorized");
    }

    UserService.validateAccessToken(parts[1]).then(
      (payload: IPayload) => {
        res.locals.payload = payload;
        next();
      },
      (error: ErrorResponse) => {
        res.status(error.status).send(error.message);
      }
    );
  }
}
