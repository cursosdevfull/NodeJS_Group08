import RoleOperation from "../../role/infraestructure/role.operation";

import UserUseCase from "../application/user.usecase";
import UserOperation from "../infraestructure/user.operation";
import express from "express";
import UserController from "./user.controller";
import errorHandler from "../../shared/helpers/errors.helper";

/* import { UploadMiddleware } from "@shared/middlewares/upload.middleware"; */
import { UploadBuilder } from "../../shared/application/upload-builder";
import {
  FactoryAWS,
  IUploadImage,
  IUploadMultiple,
} from "../../shared/middlewares/upload.middleware";

const operationUser = new UserOperation();
const operationRole = new RoleOperation();
const useCase = new UserUseCase(operationUser, operationRole);
const controller = new UserController(useCase);

const route = express.Router();

const uploadMiddleware: IUploadImage & IUploadMultiple = new FactoryAWS();

route.get(
  "/",
  // AuthorizationGuard.canActivate("USERS_LIST"),
  errorHandler.catchError(controller.list.bind(controller))
);
route.get("/:id", errorHandler.catchError(controller.getOne.bind(controller)));
route.get(
  "/photo/:id",
  errorHandler.catchError(controller.getPhoto.bind(controller))
);
route.get(
  "/page/:page",
  errorHandler.catchError(controller.getPage.bind(controller))
);
route.post(
  "/",
  uploadMiddleware.save(
    new UploadBuilder()
      .addFieldName("photo")
      .addMaxFileSize(10000000)
      .addDirectory("users/photo")
      .addIsPublic(false)
      .addMimeTypesAllowed(["image/png", "image/jpeg"])
      .build()
  ),
  errorHandler.catchError(controller.insert.bind(controller))
);
route.put("/:id", errorHandler.catchError(controller.update.bind(controller)));
route.delete(
  "/:id",
  errorHandler.catchError(controller.delete.bind(controller))
);

export default route;
