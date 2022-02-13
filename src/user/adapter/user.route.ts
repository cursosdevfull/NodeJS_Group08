import RoleOperation from "@role/infraestructure/role.operation";
import { AuthenticationGuard } from "@shared/application/guards/authentication.guard";
import { AuthorizationGuard } from "@shared/application/guards/authorization.guard";
import UserUseCase from "@user/application/user.usecase";
import UserOperation from "@user/infraestructure/user.operation";
import express from "express";
import UserController from "./User.controller";
import errorHandler from "@shared/helpers/errors.helper";

const operation = new UserOperation();
const operationRole = new RoleOperation();
const useCase = new UserUseCase(operation, operationRole);
const controller = new UserController(useCase);

const route = express.Router();

route.get(
  "/",
  AuthenticationGuard.canActivate,
  AuthorizationGuard.canActivate("USERS_LIST"),
  errorHandler.catchError(controller.list.bind(controller))
);
route.get("/:id", errorHandler.catchError(controller.getOne.bind(controller)));
route.get(
  "/page/:page",
  errorHandler.catchError(controller.getPage.bind(controller))
);
route.post("/", errorHandler.catchError(controller.insert.bind(controller)));
route.put("/:id", errorHandler.catchError(controller.update.bind(controller)));
route.delete(
  "/:id",
  errorHandler.catchError(controller.delete.bind(controller))
);

export default route;
