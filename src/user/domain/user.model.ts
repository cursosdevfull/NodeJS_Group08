import { RoleModel } from "@role/domain/role.model";

export interface UserModel {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  refreshToken: string;
  dateExpirationRefreshToken: Date;
  roles: RoleModel[] | string[];
}
