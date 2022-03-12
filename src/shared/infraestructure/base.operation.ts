import Result from "../../shared/application/result.interface";
import { getRepository, ObjectType, Repository } from "typeorm";
import { ResponseDto } from "../application/response.dto";
import * as _ from "lodash";

export default abstract class BaseOperation<T> {
  constructor(private entity: ObjectType<T>) {}

  async list(
    where: object,
    relations: string[],
    order: object
  ): Promise<Result<T>> {
    const repository: Repository<T> = getRepository(this.entity);
    const data: T[] = await repository.find({ where, relations, order });

    return ResponseDto.format("", data);
  }

  async getOne(where: object, relations: string[]): Promise<Result<T>> {
    const repository: Repository<T> = getRepository(this.entity);
    const data: T = await repository.findOne({ where, relations });

    return ResponseDto.format("", data);
  }

  async getPage(
    page: number,
    pageSize: number,
    where: object,
    relations: string[],
    order: object
  ): Promise<Result<T>> {
    const repository: Repository<T> = getRepository(this.entity);
    const [data, total] = await repository.findAndCount({
      where,
      relations,
      order,
      skip: page * pageSize,
      take: pageSize,
    });

    return ResponseDto.format("", data, total);
  }

  async insert(entity: T): Promise<Result<T>> {
    const repository: Repository<T> = getRepository(this.entity);
    const instance = repository.create(entity);
    const data: T = await repository.save(instance);

    return ResponseDto.format("", data);
  }

  async update(
    entity: Partial<T>,
    where: object,
    relations: string[]
  ): Promise<Result<T>> {
    const repository: Repository<T> = getRepository(this.entity);
    let recordsToUpdate: any[] = await repository.find({ where, relations });

    recordsToUpdate = recordsToUpdate.map((record: any) =>
      _.merge(record, entity)
    );

    await repository.save(recordsToUpdate);

    return ResponseDto.format("", recordsToUpdate);
  }

  delete(where: object): Promise<Result<T>> {
    throw new Error("Not implemented");
  }
}
