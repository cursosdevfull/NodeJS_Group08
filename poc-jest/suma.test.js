const suma = require("./suma");

test("suma de dos números positivos 3 + 5 = 8", () => {
  expect(suma(3, 5)).toBe(8);
});

test("suma de dos números negativos -8 - 12 = -20", () => {
  expect(suma(-8, -12)).toBe(-20);
});

test("suma de un número positivo y uno negativo 20 - 7 = 13", () => {
  // Preparación
  const sumando1 = 20;
  const sumando2 = -7;

  // Ejecución
  const resultado = suma(sumando1, sumando2);

  // Comprobación
  expect(resultado).toBe(13);
});
