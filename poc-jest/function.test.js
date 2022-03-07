const forEach = require("./function");

const listUsers = [{ name: "Jhon" }, { name: "Peter" }, { name: "Mary" }];

test("Testing callback function", () => {
  // Preparación
  const items = [2, 3, 4];
  const callback = (x) => x + 2;
  const mockCallback = jest.fn((x) => x + 2);

  // Ejecución
  forEach(items, mockCallback);

  // Comprobación
  expect(mockCallback.mock.calls.length).toBe(items.length);
  expect(mockCallback.mock.calls[0][0]).toBe(items[0]);
  expect(mockCallback.mock.calls[1][0]).toBe(items[1]);

  expect(mockCallback.mock.results[0].value).toBe(items[0] + 2);
  expect(mockCallback.mock.results[1].value).toBe(items[1] + 2);
});

test("Testing async", async () => {
  // Preparación
  const find = jest.fn();
  find.mockResolvedValue(listUsers);

  // Ejecución
  const result = await find({ id: 20 }); // Comprobación
  expect(result).toBe(listUsers);
  expect(result.length).toBe(listUsers.length);
});

test("Testing controller", async () => {
  // Preparación
  const getRepository = jest.fn().mockReturnValue({
    find: jest.fn().mockResolvedValue(listUsers),
  });

  // Ejecución
  const userRepository = getRepository("user");
  const users = await userRepository.find();

  // Comprobación
  expect(users).toBe(listUsers);
});
