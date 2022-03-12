import { RoleModel } from "../domain/role.model";
import { BaseUseCase } from "../../shared/application/base.usecase";
import RoleRepository from "./role.repository";

export default class RoleUseCase extends BaseUseCase<
  RoleModel,
  RoleRepository
> {
  constructor(public repository: RoleRepository) {
    super(repository);
  }
}
