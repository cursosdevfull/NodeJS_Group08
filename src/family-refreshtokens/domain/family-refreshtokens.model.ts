import { UserModel } from '@user/domain/user.model';

export interface FamilyRefreshTokensModel {
  id?: number;
  refreshToken: string;
  status?: boolean;
  user?: UserModel;
}
