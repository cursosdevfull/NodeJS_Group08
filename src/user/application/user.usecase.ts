import { UserModel } from "@user/domain/user.model";
import { UserRepository } from "@user/application/user.repository";

export default class {
  constructor(private userRepository: UserRepository) {}

  list() {
    return this.userRepository.list();
  }

  getOne(email: string) {
    return this.userRepository.getOne(email);
  }

  insert(user: UserModel) {
    return this.userRepository.insert(user);
  }
}
