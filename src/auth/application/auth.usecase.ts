import Result from "@shared/application/result.interface";
import { ResponseDto } from "@shared/infraestructure/response.dto";
import UserRepository from "@user/application/user.repository";
import { UserService } from "@user/application/user.service";
import { UserModel } from "@user/domain/user.model";
import { TokensModel } from "../domain/tokens.model";
import { compareAsc, add } from "date-fns";

export class AuthUseCase {
  constructor(private repository: UserRepository) {}

  async login(user: Partial<UserModel>): Promise<Result<TokensModel>> {
    const result: Result<UserModel> = await this.repository.getOne(
      { email: user.email },
      ["roles"]
    );
    const userMatched: UserModel = result.payload.data as UserModel;

    if (userMatched) {
      const isPasswordValid = UserService.decryptPassword(
        user.password,
        userMatched.password
      );
      if (isPasswordValid) {
        if (
          compareAsc(new Date(), userMatched.dateExpirationRefreshToken) > 0
        ) {
          userMatched.refreshToken = UserService.generateRefreshToken();
          userMatched.dateExpirationRefreshToken = add(new Date(), {
            months: 1,
          });
          await this.repository.update(userMatched, { id: userMatched.id }, []);
        }

        const tokens: TokensModel = {
          accessToken: UserService.generateAccessToken(userMatched),
          refreshToken: userMatched.refreshToken,
        };
        return ResponseDto.format("", tokens);
      } else {
      }
    } else {
      return null;
    }
  }

  async getNewAccessToken(
    entity: Partial<UserModel>
  ): Promise<Result<TokensModel>> {
    const result: Result<UserModel> = await this.repository.getOne(
      { refreshToken: entity.refreshToken },
      ["roles"]
    );
    const userMatched: UserModel = result.payload.data as UserModel;

    if (userMatched) {
      if (compareAsc(new Date(), userMatched.dateExpirationRefreshToken) > 0) {
        return null;
      }

      const tokens: TokensModel = {
        accessToken: UserService.generateAccessToken(userMatched),
        refreshToken: userMatched.refreshToken,
      };
      return ResponseDto.format("", tokens);
    } else {
      return null;
    }
  }
}
