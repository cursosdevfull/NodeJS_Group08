import UserOperation from "@user/infraestructure/user.operation";
import express from "express";
import FamilyRefreshTokensOperation from "@family-refreshtokens/infraestructure/family-refreshtokens.infraestructure";
import { AuthUseCase } from "../application/auth.usecase";
import AuthController from "./auth.controller";

const operationUser = new UserOperation();
const operationFamilyRefreshTokens = new FamilyRefreshTokensOperation();
const useCase = new AuthUseCase(operationUser, operationFamilyRefreshTokens);
const controller = new AuthController(useCase);

const route = express.Router();

route.post("/login", controller.login.bind(controller));
route.get(
  "/request-new-access-token/:refreshToken",
  controller.getNewAccessToken.bind(controller)
);

export default route;
