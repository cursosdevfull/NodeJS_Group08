import UserUseCase from "@user/application/user.usecase";
import { UserModel } from "@user/domain/user.model";
import { Request, Response } from "express";

export default class UserController {
  constructor(private useCase: UserUseCase) {}

  async list(req: Request, res: Response) {
    const results = await this.useCase.list({}, [], {
      lastname: "ASC",
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
      lastname: "ASC",
      name: "ASC",
    });

    res.json(results);
  }

  async insert(req: Request, res: Response) {
    const body = req.body;
    const user: Partial<UserModel> = {
      name: body.name,
      lastname: body.lastname,
      email: body.email,
      password: body.password,
      roles: body.roles,
    };

    const results = await this.useCase.insert(user);

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
