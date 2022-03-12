import * as httpMock from "node-mocks-http";
import { MockMedicUseCase } from "./repositories/mockMedicUseCase";

let req: any, res: any, next;
let mockMedicUseCase: any, medicController: any;

describe("medic.controller", () => {
  beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = null;
    mockMedicUseCase = new MockMedicUseCase();
    medicController = mockMedicUseCase.getController();
  });

  it("list", async () => {
    // Ejecución
    await medicController.list(req, res);

    // Comprobación
    mockMedicUseCase.assertMockList(res);
  });

  it("getOne", async () => {
    // Ejecución
    await medicController.getOne(req, res);

    // Comprobación
    mockMedicUseCase.assertMockGetOne(res);
  });

  it("getPage", async () => {
    // Ejecución
    await medicController.getPage(req, res);

    // Comprobación
    mockMedicUseCase.assertMockGetPage(res);
  });

  it("insert", async () => {
    // Ejecución
    await medicController.insert(req, res);

    // Comprobación
    mockMedicUseCase.assertMockInsert(res);
  });

  it("update", async () => {
    // Ejecución
    await medicController.update(req, res);

    // Comprobación
    mockMedicUseCase.assertMockUpdate(res);
  });

  it("delete", async () => {
    // Ejecución
    await medicController.delete(req, res);

    // Comprobación
    mockMedicUseCase.assertMockDelete(res);
  });
});
