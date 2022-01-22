import { UserRepository } from "@user/application/user.repository";
import { UserModel } from "@user/domain/user.model";

const users: UserModel[] = [
  {
    name: "Juan",
    lastname: "Carbajal",
    email: "juan@gmail.com",
    password: "123456",
    refreshToken: "",
    roles: [],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Juan",
    lastname: "Carbajal",
    email: "juan@gmail.com",
    password: "123456",
    refreshToken: "",
    roles: [],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Juan",
    lastname: "Carbajal",
    email: "juan@gmail.com",
    password: "123456",
    refreshToken: "",
    roles: [],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default class implements UserRepository {
  list(): UserModel[] {
    return users;
  }
  getOne(email: string): UserModel {
    const user = users.find((el) => el.email === email);
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
