import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection().then(async (connection) => {
  console.log("Connection success");

  const userRepository = connection.getRepository(User);
  const carRepository = connection.getRepository(Car);

  /*   const listCars = await carRepository.find({ relations: ["users"] }); */
  const listCars = await carRepository.find();
  console.log("listCars", JSON.stringify(listCars, null, "\t"));

  /*   const listUsers = await userRepository.find({ relations: ["cars"] }); */
  /* const listUsers = await userRepository.find();
  console.log("listUsers", JSON.stringify(listUsers, null, "\t")); */

  const user = await userRepository.findOne();
  const cars = await user.cars;

  console.log(cars);
});
