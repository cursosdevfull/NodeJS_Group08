import { DriverRepository } from "@driver/application/driver.repository";
import { DriverModel } from "@driver/domain/driver.model";
import { BaseOperation } from "@shared/infraestructure/base.operation";

export class DriverOperation
  extends BaseOperation<DriverModel>
  implements DriverRepository
{
  constructor() {
    super();
  }
}
