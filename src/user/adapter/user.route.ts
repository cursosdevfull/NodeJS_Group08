import express from "express";
import Controller from "./user.controller";

const route = express.Router();
const controller = new Controller();

route.get("/", controller.list.bind(controller));
route.get("/:age", controller.getOne);
route.post("/", controller.insert);

export default route;
