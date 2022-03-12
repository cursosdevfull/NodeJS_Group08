import { BaseRepository } from '@shared/application/base.repository';
import { FamilyRefreshTokensModel } from '../domain/family-refreshtokens.model';

export default interface FamilyRefreshTokensRepository
  extends BaseRepository<FamilyRefreshTokensModel> {}
