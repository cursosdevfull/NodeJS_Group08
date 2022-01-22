import { ID } from "@shared/values/id.type";

export interface BaseRepository<T> {
  insert(entity: T): T;
  update(id: ID, entity: T): T;
  delete(id: ID): T;
  list(): T[];
  getOne(id: ID): T;
}
