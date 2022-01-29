import express from "express";
/* import Controller from "@driver/adapter/driver.controller";
import { DriverOperation } from "@driver/infraestructure/driver.operation";
import { DriverUseCase } from "@driver/application/driver.usecase";

const driverOperation = new DriverOperation();
const driverUseCase = new DriverUseCase(driverOperation); */

const route = express.Router();
/* const controller = new Controller(driverUseCase);

route.get("/", controller.list.bind(controller));
route.get("/:id", controller.getOne.bind(controller));
route.post("/", controller.insert.bind(controller));
route.put("/:id", controller.update.bind(controller));
route.delete("/:id", controller.delete.bind(controller)); */

export default route;
