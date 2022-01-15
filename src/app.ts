import express from "express";
import routerUser from "./user/adapter/user.route";

const app = express();

app.use("/users", routerUser);

app.use("**", (request: any, response: any) => {
  response.writeHead(404, { "content-type": "text/plain" });
  response.write("Not found");
  response.end();
});

export default app;
