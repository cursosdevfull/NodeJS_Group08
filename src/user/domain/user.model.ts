import { RoleModel } from "@role/domain/role.model";

export interface UserModel {
  name: string;
  lastname: string;
  email: string;
  password: string;
  refreshToken: string;
  roles: RoleModel[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
