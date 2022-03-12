import { BaseRepository } from './base.repository';
import Result from './result.interface';
import yenv from 'yenv';
import logger from '../../shared/helpers/logging.helper';
import { Trace } from '../../shared/helpers/trace.helper';

const env = yenv();

export class BaseUseCase<T, U extends BaseRepository<T>> {
  constructor(public repository: U) {}

  list(
    where: object = {},
    relations: string[] = [],
    order: object = {}
  ): Promise<Result<T>> {
    where = { ...where, active: true };
    logger.info({
      typeElement: 'BaseUseCase',
      typeAction: 'list',
      traceId: Trace.getTraceId(),
      message: 'Listing all',
    });

    return this.repository.list(where, relations, order);
  }

  getOne(where: object = {}, relations: string[] = []): Promise<Result<T>> {
    where = { ...where, active: true };
    return this.repository.getOne(where, relations);
  }

  getPage(
    page: number,
    where: object = {},
    relations: string[] = [],
    order: object = {}
  ): Promise<Result<T>> {
    where = { ...where, active: true };
    const pageSize: number = env.APP.PAGE_SIZE;
    return this.repository.getPage(page, pageSize, where, relations, order);
  }

  insert(entity: T): Promise<Result<T>> {
    return this.repository.insert(entity);
  }

  update(entity: Partial<T>, where: object = {}, relations: string[] = []) {
    return this.repository.update(entity, where, relations);
  }

  delete(where: object): Promise<Result<T>> {
    const entity: any = { active: false };
    return this.repository.update(entity, where, []);
  }
}
