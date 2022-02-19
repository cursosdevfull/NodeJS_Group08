import express, { Application } from "express";
import routerUser from "@user/adapter/user.route";
import routerDriver from "@driver/adapter/driver.route";
import routerMedic from "@medic/adapter/medic.route";
import routerRole from "@role/adapter/role.route";
import routerAuth from "@auth/adapter/auth.route";
import errorHelper from "@shared/helpers/errors.helper";
import multer from "multer";
import { AuthenticationGuard } from "@shared/application/guards/authentication.guard";
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
    this.expressApp.use(express.urlencoded({ extended: true }));
    this.expressApp.use(express.json()); // request.body
  }

  mountRoutes() {
    this.expressApp.use(
      "/users",
      /* AuthenticationGuard.canActivate,  */ routerUser
    );
    this.expressApp.use("/drivers", routerDriver);
    this.expressApp.use("/medics", routerMedic);
    this.expressApp.use("/roles", routerRole);
    this.expressApp.use("/auth", routerAuth);
  }

  mountErrors() {
    this.expressApp.use(errorHelper.notFound);
    this.expressApp.use(errorHelper.generic);
  }
}

export default new App().expressApp;
