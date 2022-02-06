import express, { Application } from "express";
import routerUser from "@user/adapter/user.route";
import routerDriver from "@driver/adapter/driver.route";
import routerMedic from "@medic/adapter/medic.route";
import routerRole from "@role/adapter/role.route";
import routerAuth from "@auth/adapter/auth.route";
class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountErrors();
  }

  mountMiddlewares() {
    this.expressApp.use(express.urlencoded({ extended: true }));
    this.expressApp.use(express.json()); // request.body
  }

  mountRoutes() {
    this.expressApp.use("/users", routerUser);
    this.expressApp.use("/drivers", routerDriver);
    this.expressApp.use("/medics", routerMedic);
    this.expressApp.use("/roles", routerRole);
    this.expressApp.use("/auth", routerAuth);
  }

  mountErrors() {
    this.expressApp.use("**", (request: any, response: any) => {
      response.writeHead(404, { "content-type": "text/plain" });
      response.write("Not found");
      response.end();
    });
  }
}

export default new App().expressApp;
