import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection().then(async (connection) => {
  console.log("Connection success");

  const userRepository = connection.getRepository(User);
  const carRepository = connection.getRepository(Car);

  const user = await userRepository.findOne({ age: 25 });

  const car = new Car();
  car.manufacturer = "Ford";
  car.description = "Focus";
  car.color = "Black";
  car.year = 2020;
  car.isSold = false;
  car.user = user;
  await carRepository.save(car);

  //user.car = car;
});
