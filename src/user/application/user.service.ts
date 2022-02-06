import { v4 as uuidv4 } from "uuid";
import * as bcryptjs from "bcryptjs";
import jwt from "jwt-simple";
import { UserModel } from "@user/domain/user.model";
import { add, getUnixTime } from "date-fns";

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
    const dateExpired = add(dateCreated, { minutes: 30 });

    const payload = {
      iat: getUnixTime(dateCreated),
      exp: getUnixTime(dateExpired),
      name: user.name,
      lastname: user.lastname,
      roles: user.roles,
    };
    return jwt.encode(payload, "abcdefg");
  }
}
