import RoleOperation from "@role/infraestructure/role.operation";
import { AuthenticationGuard } from "@shared/application/guards/authentication.guard";
import { AuthorizationGuard } from "@shared/application/guards/authorization.guard";
import UserUseCase from "@user/application/user.usecase";
import UserOperation from "@user/infraestructure/user.operation";
import express from "express";
import UserController from "./User.controller";
import errorHandler from "@shared/helpers/errors.helper";
import FamilyRefreshTokensOperation from "src/family-refreshtokens/infraestructure/family-refreshtokens.infraestructure";
import { UploadMiddleware } from "@shared/middlewares/upload.middleware";
import { UploadBuilder } from "@shared/application/upload-builder";

const operationUser = new UserOperation();
const operationRole = new RoleOperation();
const useCase = new UserUseCase(operationUser, operationRole);
const controller = new UserController(useCase);

const route = express.Router();

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
  UploadMiddleware.S3(
    new UploadBuilder()
      .addFieldName("photo")
      .addMaxFileSize(10)
      .addDirectory("users/photo")
      .addIsPublic(false)
      .addMimeTypesAllowed(["image/png", "image/jpeg"])
      .build()
    /* {
      fieldName: "photo",
      maxFileSize: 4000000,
      directory: "users/photo",
      isPublic: false,
      mimeTypesAllowed: ["image/png", "image/jpeg"],
    } */
    /*  "photo",
    4000000,
    "users/photos",
    false,
    "image/png",
    "image/jpeg" */
  ),
  errorHandler.catchError(controller.insert.bind(controller))
);
route.put("/:id", errorHandler.catchError(controller.update.bind(controller)));
route.delete(
  "/:id",
  errorHandler.catchError(controller.delete.bind(controller))
);

export default route;
