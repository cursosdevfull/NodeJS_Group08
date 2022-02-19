import { RoleModel } from "@role/domain/role.model";
import { FamilyRefreshTokensModel } from "src/family-refreshtokens/domain/family-refreshtokens.model";

export interface UserModel {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  familyRefreshTokens: FamilyRefreshTokensModel[];
  roles: RoleModel[] | string[];
  photo: string;
}
