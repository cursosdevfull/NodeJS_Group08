import { MedicModel } from "@medic/domain/medic.model";
import { BaseRepository } from "@shared/application/base.repository";
import Result from "@shared/application/result.interface";

export default interface MedicRepository extends BaseRepository<MedicModel> {
  getUniqueMedic(): Promise<Result<MedicModel>>;
  getReportMedic(): Promise<Result<MedicModel>>;
}
