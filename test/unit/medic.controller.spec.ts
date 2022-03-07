import MedicController from "../../src/medic/adapter/medic.controller";
import MedicUseCase from "../../src/medic/application/medic.usecase";

const listMedics = [
  {
    name: "John",
    paternal_surname: "Doe",
    maternal_surname: "Doe",
    cmp: "123456789",
    document: "123456789",
    typeDocument: "4",
  },
];

describe("medic.controller", () => {
  it("list", async () => {
    // Preparación
    (MedicUseCase as jest.Mock) = jest.fn().mockReturnValue({
      list: jest.fn().mockResolvedValue(listMedics),
    });
    const medicUseCase = new MedicUseCase(null);
    const medicController = new MedicController(medicUseCase);

    // Ejecución
    const result = await medicController.list(req, res);
  });
});
