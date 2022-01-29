import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection().then(async (connection) => {
  console.log("Connection success");

  const userRepository = connection.getRepository(User);
  const users = await userRepository.findAndCount({
    relations: ["cars"],
    order: { age: "ASC" },
    skip: 0,
    take: 1,
  });
  console.log(JSON.stringify(users, null, "\t"));
});
