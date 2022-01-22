import { Application } from "express";
import http from "http";
import IBootstrap from "@bootstrap/bootstrap.interface";

export default class implements IBootstrap {
  constructor(private app: Application) {}

  initialize(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);
      server
        .listen(3000)
        .on("listening", () => {
          console.log("Server is listening on port 3000");
          resolve("Server is OK");
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
}
