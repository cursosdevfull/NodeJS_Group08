const edad = require("./anonima");

jest.mock("./anonima.js");

test("Obtener score", () => {
  // Preparación
  edad.mockImplementationOnce(() => 300);
  edad.mockImplementation(() => 50);

  // Ejecución
  const resultado1 = edad();
  const resultado2 = edad();

  // Comprobación
  expect(resultado1).toBe(300);
  expect(resultado2).toBe(50);
});
