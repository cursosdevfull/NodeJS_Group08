import { ID } from "@shared/values/id.type";

export class BaseOperation<T> {
  update(id: ID, entity: T): T {
    return entity;
  }
  delete(id: ID): T {
    return {} as T;
  }
  list(): T[] {
    return [] as T[];
  }
  getOne(id: ID): T {
    return {} as T;
  }
  insert(entity: T): T {
    return entity;
  }
}
