import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection().then(async (connection) => {
  console.log("Connection success");

  const userRepository = connection.getRepository(User);
  const carRepository = connection.getRepository(Car);

  const car1 = new Car();
  car1.manufacturer = "Ford";
  car1.description = "Focus";
  car1.color = "Black";
  car1.year = 2020;
  car1.isSold = false;

  const car2 = new Car();
  car2.manufacturer = "Hyundai";
  car2.description = "Elantra";
  car2.color = "White";
  car2.year = 2020;
  car2.isSold = true;

  const user = new User();
  user.name = "Peter";
  user.lastname = "Parker";
  user.age = 30;
  user.cars = [car1, car2];

  await userRepository.save(user);
});
