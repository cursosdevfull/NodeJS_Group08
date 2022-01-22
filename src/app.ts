import express, { Application } from "express";
import routerUser from "@user/adapter/user.route";
import routerDriver from "@driver/adapter/driver.route";

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
