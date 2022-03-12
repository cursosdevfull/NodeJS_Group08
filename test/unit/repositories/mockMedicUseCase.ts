import MedicController from "../../../src/medic/adapter/medic.controller";
import MedicUseCase from "../../../src/medic/application/medic.usecase";

import mockMedic from "../mocks/medic.json";
import mockMedicResult from "../mocks/medic-result.json";

export class MockMedicUseCase {
  constructor() {
    (MedicUseCase as jest.Mock) = jest.fn().mockReturnValue({
      list: jest.fn().mockResolvedValue([mockMedic]),
      getOne: jest.fn().mockResolvedValue(mockMedic),
      getPage: jest.fn().mockResolvedValue(mockMedicResult),
      insert: jest.fn().mockResolvedValue(mockMedic),
      update: jest.fn().mockResolvedValue(mockMedic),
      delete: jest.fn().mockResolvedValue(mockMedic),
    });
  }

  getCache() {
    return {
      set(key: string, value: string) {},
      clear(key: string) {
        return Promise.resolve();
      },
    };
  }

  getController() {
    const medicUseCase = new MedicUseCase(null);
    return new MedicController(medicUseCase, this.getCache());
  }

  assertMockList(res: any) {
    const result = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(result).toEqual([mockMedic]);
  }

  assertMockGetOne(res: any) {
    const result = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(result).toEqual(mockMedic);
  }

  assertMockGetPage(res: any) {
    const result = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(result).toEqual(mockMedicResult);
  }

  assertMockInsert(res: any) {
    const result = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(result).toEqual(mockMedic);
  }

  assertMockUpdate(res: any) {
    const result = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(result).toEqual(mockMedic);
  }

  assertMockDelete(res: any) {
    const result = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(result).toEqual(mockMedic);
  }
}
