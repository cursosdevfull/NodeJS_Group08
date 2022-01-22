import { DriverModel } from "@driver/domain/driver.model";
import { BaseUseCase } from "@shared/application/base.usecase";
import { DriverRepository } from "@driver/application/driver.repository";

export class DriverUseCase extends BaseUseCase<DriverModel, DriverRepository> {
  constructor(repository: DriverRepository) {
    super(repository);
  }
}
