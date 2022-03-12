import { v4 as uuidv4 } from "uuid";
import * as bcryptjs from "bcryptjs";
import jwt from "jwt-simple";
import { UserModel } from "../domain/user.model";
import { add, getUnixTime } from "date-fns";
import yenv from "yenv";
import {
  TOKEN_ERROR,
  TOKEN_ERROR_MESSAGE,
} from "../../shared/enum/token-error.enum";
import { ResponseValidateToken } from "../../shared/types/response-validate-token.type";

const env = yenv();

export class UserService {
  static generateRefreshToken(): string {
    return uuidv4();
  }

  static async cryptPassword(password: string): Promise<string> {
    return await bcryptjs.hash(password, 10);
  }

  static async decryptPassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return await bcryptjs.compare(password, passwordHash);
  }

  static generateAccessToken(user: UserModel): string {
    const dateCreated = new Date();
    const dateExpired = add(dateCreated, { minutes: env.TOKEN.TIME_LIVE });

    const payload = {
      iat: getUnixTime(dateCreated),
      exp: getUnixTime(dateExpired),
      name: user.name,
      lastname: user.lastname,
      roles: user.roles,
    };
    return jwt.encode(payload, env.TOKEN.SECRET_WORD);
  }

  static validateAccessToken(token: string): Promise<ResponseValidateToken> {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(token, env.TOKEN.SECRET_WORD);
        resolve(payload);
      } catch (error) {
        if (error.message.toLowerCase() === TOKEN_ERROR.TOKEN_EXPIRED) {
          reject({ status: 409, message: TOKEN_ERROR_MESSAGE.TOKEN_EXPIRED });
        } else {
          reject({ status: 401, message: TOKEN_ERROR_MESSAGE.TOKEN_INVALID });
        }
      }
    });
  }
}
