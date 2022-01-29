/* import { DriverUseCase } from "@driver/application/driver.usecase";
import { Request, Response } from "express";

export default class {
  constructor(private driverUseCase: DriverUseCase) {}

  list(request: Request, response: Response) {
    response.json(this.driverUseCase.list());
  }

  insert(request: Request, response: Response) {
    const body = request.body;
    response.json(this.driverUseCase.insert(body));
  }

  update(request: Request, response: Response) {
    const id = +request.params.id;
    const body = request.body;
    response.json(this.driverUseCase.update(id, body));
  }

  delete(request: Request, response: Response) {
    const id = +request.params.id;
    response.json(this.driverUseCase.delete(id));
  }

  getOne(request: Request, response: Response) {
    const id = +request.params.id;
    response.json(this.driverUseCase.getOne(id));
  }
}
 */
