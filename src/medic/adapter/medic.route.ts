import MedicUseCase from "@medic/application/medic.usecase";
import MedicOperation from "@medic/infraestructure/medic.operation";
import CacheRedis from "@shared/middlewares/cache.middleware";
import express from "express";
import MedicController from "./medic.controller";

const operation = new MedicOperation();
const useCase = new MedicUseCase(operation);
const controller = new MedicController(useCase);

const route = express.Router();

route.get(
  "/",
  CacheRedis.handle("MEDIC_LIST"),
  controller.list.bind(controller)
);
route.get("/unique", controller.getUniqueMedic.bind(controller));
route.get("/report", controller.getReportMedic.bind(controller));
route.get("/:id", controller.getOne.bind(controller));
route.get("/page/:page", controller.getPage.bind(controller));
route.post("/", controller.insert.bind(controller));
route.put("/:id", controller.update.bind(controller));
route.delete("/:id", controller.delete.bind(controller));

export default route;
