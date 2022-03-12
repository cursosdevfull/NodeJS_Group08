import { RoleModel } from '../domain/role.model';
import { BaseRepository } from '../../shared/application/base.repository';

export default interface RoleRepository extends BaseRepository<RoleModel> {}
