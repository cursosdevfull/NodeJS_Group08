import { User } from "@entities/user.entity";
import UserRepository from "@user/application/User.repository";
import { UserModel } from "@user/domain/User.model";
import BaseOperation from "@shared/infraestructure/base.operation";
import { getRepository, Repository } from "typeorm";

export default class UserOperation
  extends BaseOperation<UserModel>
  implements UserRepository
{
  constructor() {
    super(User);
  }
}
