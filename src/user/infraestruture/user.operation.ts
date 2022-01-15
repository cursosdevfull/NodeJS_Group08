import { UserRepository } from "../application/user.repository";
import { UserModel } from "../domain/user.model";

const users = [
  { name: "Juan", age: 20 },
  { name: "Pedro", age: 30 },
  { name: "Maria", age: 40 },
];

export default class implements UserRepository {
  list(): UserModel[] {
    return users;
  }
  getOne(age: number): UserModel {
    const user = users.find((el) => el.age === age);
    if (user) {
      return user;
    }
    return {} as UserModel;
  }
  insert(user: UserModel): UserModel {
    users.push(user);
    return user;
  }
}
