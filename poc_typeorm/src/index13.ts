import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection().then(async (connection) => {
  console.log("Connection success");

  const userRepository = connection.getRepository(User);
  const userUpdated = await userRepository
    .createQueryBuilder()
    .update(User)
    .set({ name: "Juan", lastname: "Perez" })
    .where("id = :id", { id: 1 })
    .execute();

  console.log("userUpdated: ", userUpdated);

  const userDeleted = await userRepository
    .createQueryBuilder()
    .delete()
    .where("id = :id", { id: 1 })
    .execute();

  console.log("userDeleted: ", userDeleted);
});
