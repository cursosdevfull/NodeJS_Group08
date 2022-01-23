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

  const user1 = new User();
  user1.name = "Peter";
  user1.lastname = "Parker";
  user1.age = 30;
  user1.cars = [car1, car2];

  const user2 = new User();
  user2.name = "Peter";
  user2.lastname = "Parker";
  user2.age = 30;
  user2.cars = [car1];

  const usersToSave = [user1, user2];

  await userRepository.save(usersToSave);

  /*   await userRepository.save(user1);
  await userRepository.save(user2); */
});
