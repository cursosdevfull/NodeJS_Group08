import { UserModel } from "../domain/user.model";

export interface UserRepository {
  list(): UserModel[];
  getOne(age: number): UserModel;
  insert(user: UserModel): UserModel;
}
