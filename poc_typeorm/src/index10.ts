import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection().then(async (connection) => {
  console.log("Connection success");

  const userRepository = connection.getRepository(User);
  const users = await userRepository.find({
    order: { age: "ASC" },
    relations: ["cars"],
  });
  console.log(JSON.stringify(users, null, "\t"));
});
