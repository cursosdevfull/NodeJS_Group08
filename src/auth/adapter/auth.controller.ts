import { TokensModel } from "@auth/domain/tokens.model";
import Result from "@shared/application/result.interface";
import UserUseCase from "@user/application/user.usecase";
import { UserModel } from "@user/domain/user.model";
import { Request, Response } from "express";
import { AuthUseCase } from "../application/auth.usecase";

export default class AuthController {
  constructor(private useCase: AuthUseCase) {}

  async login(req: Request, res: Response) {
    const user: Partial<UserModel> = {
      email: req.body.email,
      password: req.body.password,
    };
    const results = await this.useCase.login(user);

    res.json(results);
  }

  async getNewAccessToken(req: Request, res: Response) {
    const user: Partial<UserModel> = req.params;

    const result: Result<TokensModel> = await this.useCase.getNewAccessToken(
      user
    );
    if (result) {
      return res.json(result);
    }

    return res.status(404).send("User Not found");
  }
}
