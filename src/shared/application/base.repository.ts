import { ID } from "@shared/values/id.type";
import Result from "./result.interface";

export interface BaseRepository<T> {
  list(where: object, relations: string[], order: object): Promise<Result<T>>;
  getOne(where: object, relations: string[]): Promise<Result<T>>;
  getPage(
    page: number,
    pageSize: number,
    where: object,
    relations: string[],
    order: object
  ): Promise<Result<T>>;
  insert(entity: T): Promise<Result<T>>;
  update(
    entity: Partial<T>,
    where: object,
    relations: string[]
  ): Promise<Result<T>>;
  delete(where: object): Promise<Result<T>>;
}
