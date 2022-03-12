import { User } from '../../entities/user.entity';
import UserRepository from '../application/user.repository';
import { UserModel } from '../domain/user.model';
import BaseOperation from '../../shared/infraestructure/base.operation';

export default class UserOperation
  extends BaseOperation<UserModel>
  implements UserRepository
{
  constructor() {
    super(User);
  }
}
