import { Medic } from "@entities/medic.entity";
import MedicRepository from "@medic/application/medic.repository";
import { MedicModel } from "@medic/domain/medic.model";
import Result from "@shared/application/result.interface";
import BaseOperation from "@shared/infraestructure/base.operation";
import { ResponseDto } from "@shared/infraestructure/response.dto";
import { getRepository, Repository } from "typeorm";

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
      .createQueryBuilder("medic")
      .select(["distinct medic.cmp"])
      .where("active = true")
      .getRawMany();

    return ResponseDto.format("", data);
  }

  async getReportMedic(): Promise<Result<MedicModel>> {
    const repository: Repository<Medic> = getRepository(Medic);
    const data: Medic[] = await repository
      .createQueryBuilder()
      .select([
        "id",
        "cmp",
        "paternal_surname",
        "maternal_surname",
        "name",
        "active",
      ])
      .orderBy("active", "DESC")
      .addOrderBy("paternal_surname", "ASC")
      .addOrderBy("maternal_surname", "ASC")
      .addOrderBy("name", "ASC")
      .getRawMany();

    return ResponseDto.format("", data);
  }
}
