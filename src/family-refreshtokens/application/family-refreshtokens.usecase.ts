import { BaseUseCase } from '../../shared/application/base.usecase';
import { FamilyRefreshTokensModel } from '../domain/family-refreshtokens.model';
import FamilyRefreshTokensRepository from './family-refreshtokens.repository';

export default class FamilyRefreshTokensUseCase extends BaseUseCase<
  FamilyRefreshTokensModel,
  FamilyRefreshTokensRepository
> {
  constructor(public repository: FamilyRefreshTokensRepository) {
    super(repository);
  }
}
