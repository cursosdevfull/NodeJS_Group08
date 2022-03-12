import { FamilyRefreshTokens } from "../../entities/family-refresh-tokens.entity";
import BaseOperation from "../../shared/infraestructure/base.operation";
import FamilyRefreshTokensRepository from "../application/family-refreshtokens.repository";
import { FamilyRefreshTokensModel } from "../domain/family-refreshtokens.model";

export default class FamilyRefreshTokensOperation
  extends BaseOperation<FamilyRefreshTokensModel>
  implements FamilyRefreshTokensRepository
{
  constructor() {
    super(FamilyRefreshTokens);
  }
}
