import express from "express";
import Controller from "@user/adapter/user.controller";
import UserOperation from "@user/infraestruture/user.operation";
import UserUseCase from "@user/application/user.usecase";

const userOperation = new UserOperation();
const userUseCase = new UserUseCase(userOperation);

const route = express.Router();
const controller = new Controller(userUseCase);

route.get("/", controller.list.bind(controller));
route.get("/:email", controller.getOne.bind(controller));
route.post("/", controller.insert.bind(controller));

export default route;
