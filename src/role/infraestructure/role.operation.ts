import { Role } from "@entities/role.entity";
import RoleRepository from "@role/application/Role.repository";
import { RoleModel } from "@role/domain/Role.model";
import BaseOperation from "@shared/infraestructure/base.operation";

export default class RoleOperation
  extends BaseOperation<RoleModel>
  implements RoleRepository
{
  constructor() {
    super(Role);
  }
}
