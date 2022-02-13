import RedisBootstrap from "@bootstrap/redis.bootstrap";
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

    console.log("Almacenando en Redis");

    RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(results));

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

    await RedisBootstrap.clear("MEDIC_");

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
