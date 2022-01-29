import { MedicModel } from "@medic/domain/medic.model";
import { BaseRepository } from "@shared/application/base.repository";

export default interface MedicRepository extends BaseRepository<MedicModel> {}
