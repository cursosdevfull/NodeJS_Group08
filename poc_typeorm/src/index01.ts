import { createConnection } from "typeorm";
import { User } from "./entity/User";

createConnection().then(async (connection) => {
  console.log("Connection success");

  const user = new User();
  user.name = "Peter";
  user.lastname = "Salt";
  user.age = 40;

  const userRepository = connection.getRepository(User);
  // await userRepository.save(user);

  const listUsers = await userRepository.find();
  console.log("listUsers", listUsers);

  const listOneUser = await userRepository.findOne();
  console.log("listOneUser", listOneUser);

  const get40 = await userRepository.findOne({ age: 40 });
  console.log("get40", get40);

  const [records, count] = await userRepository.findAndCount();
  console.log("records", records);
  console.log("count", count);
});
