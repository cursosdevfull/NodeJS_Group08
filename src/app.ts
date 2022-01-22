import express, { Application } from "express";
import routerUser from "@user/adapter/user.route";

class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.mountRoutes();
    this.mountErrors();
  }

  mountRoutes() {
    this.expressApp.use("/users", routerUser);
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
