import { UserModel } from "@user/domain/user.model";
import { BaseUseCase } from "@shared/application/base.usecase";
import UserRepository from "./user.repository";
import Result from "@shared/application/result.interface";
import { UserService } from "./user.service";
import RoleRepository from "@role/application/role.repository";
import { RoleModel } from "@role/domain/role.model";
import { add } from "date-fns";

export default class UserUseCase extends BaseUseCase<
  UserModel,
  UserRepository
> {
  constructor(
    public repository: UserRepository,
    private repositoryRole: RoleRepository
  ) {
    super(repository);
  }

  override async insert(
    entity: Partial<UserModel>
  ): Promise<Result<UserModel>> {
    const user: UserModel = {
      ...entity,
      refreshToken: UserService.generateRefreshToken(),
    } as UserModel;

    const listRolesPromises: any[] = [];
    user.roles.forEach((role) => {
      listRolesPromises.push(this.repositoryRole.getOne({ id: +role }, []));
    });

    const roles: Result<RoleModel>[] = await Promise.all(listRolesPromises);
    user.roles = roles.map(
      (result: Result<RoleModel>) => result.payload.data as RoleModel
    );

    user.password = await UserService.cryptPassword(user.password);
    user.dateExpirationRefreshToken = add(new Date(), { months: 1 });

    return this.repository.insert(user);
  }
}
