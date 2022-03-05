import express, { Application } from "express";
import routerUser from "@user/adapter/user.route";
import routerDriver from "@driver/adapter/driver.route";
import routerMedic from "@medic/adapter/medic.route";
import routerRole from "@role/adapter/role.route";
import routerAuth from "@auth/adapter/auth.route";
import errorHelper from "@shared/helpers/errors.helper";
import multer from "multer";
import helmet from "helmet";
import yenv from "yenv";
import permission_policy from "permissions-policy";
import { AuthenticationGuard } from "@shared/application/guards/authentication.guard";

const env = yenv();
const domain = env.DOMAIN;

class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.init();
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountErrors();
  }

  init() {
    multer();
  }

  mountMiddlewares() {
    this.expressApp.use(helmet());
    this.expressApp.use(
      permission_policy({
        features: {
          geolocation: ["self", `"${domain}"`],
          camera: ["self", `"${domain}"`],
          microphone: ["self", `"${domain}"`],
          notifications: ["self", `"${domain}"`],
          push: ["self", `"${domain}"`],
        },
      })
    );

    this.expressApp.use(express.urlencoded({ extended: true }));
    this.expressApp.use(express.json()); // request.body
  }

  mountRoutes() {
    this.expressApp.get("/", (req, res) =>
      res.send("Server is running. That's ok.")
    );
    this.expressApp.use("/users", AuthenticationGuard.canActivate, routerUser);
    this.expressApp.use(
      "/drivers",
      AuthenticationGuard.canActivate,
      routerDriver
    );
    this.expressApp.use(
      "/medics",
      AuthenticationGuard.canActivate,
      routerMedic
    );
    this.expressApp.use("/roles", AuthenticationGuard.canActivate, routerRole);
    this.expressApp.use("/auth", routerAuth);
  }

  mountErrors() {
    this.expressApp.use(errorHelper.notFound);
    this.expressApp.use(errorHelper.generic);
  }
}

export default new App().expressApp;
