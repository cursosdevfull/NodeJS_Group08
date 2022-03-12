import { MockMedicOperation } from "./repositories/mockMedicOperation";

let mockMedicOperation: any, medicUseCase: any;

describe("medic.usecase", () => {
  beforeEach(() => {
    mockMedicOperation = new MockMedicOperation();
    medicUseCase = mockMedicOperation.getUseCase();
  });

  it("list", async () => {
    // Ejecución
    const response = await medicUseCase.list();

    // Comprobación
    mockMedicOperation.assertMockList(response);
  });
});
