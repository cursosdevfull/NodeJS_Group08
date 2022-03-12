import MedicUseCase from "../application/medic.usecase";
import { MedicModel } from "../domain/medic.model";
import { Request, Response } from "express";
import { ICache } from "../../shared/interfaces/cache.interface";

export default class MedicController {
  constructor(private useCase: MedicUseCase, private cache: ICache) {}

  async list(req: Request, res: Response) {
    const results = await this.useCase.list({}, [], {
      paternal_surname: "ASC",
      maternal_surname: "ASC",
      name: "ASC",
    });

    this.cache.set(res.locals.cacheKey, JSON.stringify(results));

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

    await this.cache.clear("MEDIC_");

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

  async getUniqueMedic(req: Request, res: Response) {
    const results = await this.useCase.getUniqueMedic();

    res.json(results);
  }

  async getReportMedic(req: Request, res: Response) {
    const results = await this.useCase.getReportMedic();

    res.json(results);
  }
}
