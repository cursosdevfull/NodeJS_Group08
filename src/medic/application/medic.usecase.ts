import { MedicModel } from "@medic/domain/medic.model";
import { BaseUseCase } from "@shared/application/base.usecase";
import MedicRepository from "./medic.repository";

export default class MedicUseCase extends BaseUseCase<
  MedicModel,
  MedicRepository
> {
  constructor(public repository: MedicRepository) {
    super(repository);
  }
}
