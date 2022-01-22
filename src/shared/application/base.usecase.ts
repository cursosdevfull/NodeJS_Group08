import { ID } from "@shared/values/id.type";
import { BaseRepository } from "./base.repository";

export class BaseUseCase<T, U extends BaseRepository<T>> {
  constructor(public repository: U) {}

  insert(entity: T) {
    return this.repository.insert(entity);
  }

  update(id: ID, entity: T) {
    return this.repository.update(id, entity);
  }

  delete(id: ID) {
    return this.repository.delete(id);
  }

  list() {
    return this.repository.list();
  }

  getOne(id: ID) {
    return this.repository.getOne(id);
  }
}
