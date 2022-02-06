import RoleOperation from "@role/infraestructure/role.operation";
import { AuthenticationGuard } from "@shared/application/guards/authentication.guard";
import UserUseCase from "@user/application/user.usecase";
import UserOperation from "@user/infraestructure/user.operation";
import express from "express";
import UserController from "./User.controller";

const operation = new UserOperation();
const operationRole = new RoleOperation();
const useCase = new UserUseCase(operation, operationRole);
const controller = new UserController(useCase);

const route = express.Router();

route.get(
  "/",
  AuthenticationGuard.canActivate,
  controller.list.bind(controller)
);
route.get("/:id", controller.getOne.bind(controller));
route.get("/page/:page", controller.getPage.bind(controller));
route.post("/", controller.insert.bind(controller));
route.put("/:id", controller.update.bind(controller));
route.delete("/:id", controller.delete.bind(controller));

export default route;
