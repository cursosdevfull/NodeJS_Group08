import Result from "@shared/application/result.interface";
import { UserModel } from "@user/domain/user.model";
import { TokensModel } from "../domain/tokens.model";

export interface AuthRepository {
  login(auth: Partial<UserModel>): Promise<Result<TokensModel>>;
}
