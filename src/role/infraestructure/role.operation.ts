import { Role } from "@entities/role.entity";
import RoleRepository from "@role/application/role.repository";
import { RoleModel } from "@role/domain/role.model";
import BaseOperation from "@shared/infraestructure/base.operation";

export default class RoleOperation
  extends BaseOperation<RoleModel>
  implements RoleRepository
{
  constructor() {
    super(Role);
  }
}
