import Result from "../../shared/application/result.interface";
import { ResponseDto } from "../../shared/application/response.dto";
import UserRepository from "../../user/application/user.repository";
import { UserService } from "../../user/application/user.service";
import { UserModel } from "../../user/domain/user.model";
import { TokensModel } from "../domain/tokens.model";
import { FamilyRefreshTokens } from "../../entities/family-refresh-tokens.entity";
import FamilyRefreshTokensRepository from "../../family-refreshtokens/application/family-refreshtokens.repository";
import { FamilyRefreshTokensModel } from "../../family-refreshtokens/domain/family-refreshtokens.model";

export class AuthUseCase {
  constructor(
    private repositoryUser: UserRepository,
    private repositoryFamilyRefreshTokens: FamilyRefreshTokensRepository
  ) {}

  async login(user: Partial<UserModel>): Promise<Result<TokensModel>> {
    const result: Result<UserModel> = await this.repositoryUser.getOne(
      { email: user.email },
      ["roles", "familyRefreshTokens"]
    );
    const userMatched: UserModel = result.payload.data as UserModel;

    if (userMatched) {
      const isPasswordValid = UserService.decryptPassword(
        user.password,
        userMatched.password
      );
      if (isPasswordValid) {
        const newValue = UserService.generateRefreshToken();

        await this.repositoryFamilyRefreshTokens.update(
          { status: false },
          { user: userMatched.id },
          []
        );

        const newRT = new FamilyRefreshTokens();
        newRT.refreshToken = newValue;

        const newModelRT: FamilyRefreshTokensModel = {
          refreshToken: newValue,
          user: userMatched,
        };

        userMatched.familyRefreshTokens.push(newModelRT);

        await this.repositoryUser.update(
          userMatched,
          { id: userMatched.id },
          []
        );

        const tokens: TokensModel = {
          accessToken: UserService.generateAccessToken(userMatched),
          refreshToken: newValue,
        };
        return ResponseDto.format("", tokens);
      } else {
      }
    } else {
      return null;
    }
  }

  async getNewAccessToken(refreshToken: string): Promise<Result<TokensModel>> {
    const result: Result<FamilyRefreshTokensModel> =
      await this.repositoryFamilyRefreshTokens.getOne(
        { refreshToken, status: true },
        ["user"]
      );

    const refreshTokenMatched: FamilyRefreshTokensModel = result.payload
      .data as FamilyRefreshTokensModel;

    if (refreshTokenMatched) {
      await this.repositoryFamilyRefreshTokens.update(
        { status: false },
        { user: refreshTokenMatched.user.id },
        []
      );

      const user: Result<UserModel> = await this.repositoryUser.getOne(
        { id: refreshTokenMatched.user.id },
        ["familyRefreshTokens"]
      );

      const newValue = UserService.generateRefreshToken();

      const newRT = new FamilyRefreshTokens();
      newRT.refreshToken = newValue;

      const newModelRT: FamilyRefreshTokensModel = {
        refreshToken: newValue,
        user: refreshTokenMatched.user,
      };

      const userMatched: UserModel = user.payload.data as UserModel;
      userMatched.familyRefreshTokens.push(newModelRT);

      await this.repositoryUser.update(userMatched, { id: userMatched.id }, []);

      const tokens: TokensModel = {
        accessToken: UserService.generateAccessToken(userMatched),
        refreshToken: newValue,
      };
      return ResponseDto.format("", tokens);
    } else {
      return null;
    }
  }
}
