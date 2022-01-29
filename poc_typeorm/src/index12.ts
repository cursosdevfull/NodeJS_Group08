import { createConnection } from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection().then(async (connection) => {
  console.log("Connection success");

  const userRepository = connection.getRepository(User);
  const sql = await userRepository
    .createQueryBuilder("usuarios")
    .where("usuarios.id = :id", { id: 1 })
    .getSql();
  //.getOne();
  // console.log("sql: ", sql);

  const users = await userRepository
    .createQueryBuilder("usuario")
    .select(["usuario.name", "usuario.lastname", "usuario.age"])
    //.from(User, "usuario")
    //.getSql();
    .getRawMany();

  console.log("users: ", users);
});
