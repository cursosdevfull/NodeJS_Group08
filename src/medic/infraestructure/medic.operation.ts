import { Medic } from '../../entities/medic.entity';
import MedicRepository from '../application/medic.repository';
import { MedicModel } from '../domain/medic.model';

import BaseOperation from '../../shared/infraestructure/base.operation';
import { ResponseDto } from '../../shared/application/response.dto';
import { getRepository, Repository } from 'typeorm';
import Result from '../../shared/application/result.interface';
import { Trace } from '../../shared/helpers/trace.helper';

export default class MedicOperation
  extends BaseOperation<MedicModel>
  implements MedicRepository
{
  constructor() {
    super(Medic);
  }

  async getUniqueMedic(): Promise<Result<MedicModel>> {
    const repository: Repository<Medic> = getRepository(Medic);
    const data: Medic[] = await repository
      .createQueryBuilder('medic')
      .select(['distinct medic.cmp'])
      .where('active = true')
      .getRawMany();

    return ResponseDto.format(Trace.getTraceId(), data);
  }

  async getReportMedic(): Promise<Result<MedicModel>> {
    const repository: Repository<Medic> = getRepository(Medic);
    const data: Medic[] = await repository
      .createQueryBuilder()
      .select([
        'id',
        'cmp',
        'paternal_surname',
        'maternal_surname',
        'name',
        'active',
      ])
      .orderBy('active', 'DESC')
      .addOrderBy('paternal_surname', 'ASC')
      .addOrderBy('maternal_surname', 'ASC')
      .addOrderBy('name', 'ASC')
      .getRawMany();

    return ResponseDto.format(Trace.getTraceId(), data);
  }
}
