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

    next();
  }
}
