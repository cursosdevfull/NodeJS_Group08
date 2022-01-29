import MedicUseCase from "@medic/application/medic.usecase";
import { MedicModel } from "@medic/domain/medic.model";
import { Request, Response } from "express";

export default class MedicController {
  constructor(private useCase: MedicUseCase) {}

  async list(req: Request, res: Response) {
    const results = await this.useCase.list({}, [], {
      paternal_surname: "ASC",
      maternal_surname: "ASC",
      name: "ASC",
    });

    res.json(results);
  }

  async getOne(req: Request, res: Response) {
    const where = { id: +req.params.id };
    const results = await this.useCase.getOne(where);

    res.json(results);
  }

  async getPage(req: Request, res: Response) {
    const page = +req.params.page;
    const results = await this.useCase.getPage(page, {}, [], {
      paternal_surname: "ASC",
      maternal_surname: "ASC",
      name: "ASC",
    });

    res.json(results);
  }

  async insert(req: Request, res: Response) {
    const body = req.body;
    const medic: MedicModel = {
      name: body.name,
      paternal_surname: body.paternal_surname,
      maternal_surname: body.maternal_surname,
      cmp: body.cmp,
      document: body.document,
      typeDocument: body.typeDocument,
    };

    const results = await this.useCase.insert(medic);

    res.json(results);
  }

  async update(req: Request, res: Response) {
    const body = req.body;
    const where = { id: +req.params.id };

    const result = await this.useCase.update(body, where);

    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const where = { id: +req.params.id };

    const result = await this.useCase.delete(where);

    res.json(result);
  }
}
