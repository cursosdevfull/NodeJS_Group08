import { UserModel } from '@user/domain/user.model';
import { BaseRepository } from '@shared/application/base.repository';
import Result from '@shared/application/result.interface';

export default interface UserRepository extends BaseRepository<UserModel> {}
