import { Medic } from "@entities/medic.entity";
import MedicRepository from "@medic/application/medic.repository";
import { MedicModel } from "@medic/domain/medic.model";
import BaseOperation from "@shared/infraestructure/base.operation";

export default class MedicOperation
  extends BaseOperation<MedicModel>
  implements MedicRepository
{
  constructor() {
    super(Medic);
  }
}
