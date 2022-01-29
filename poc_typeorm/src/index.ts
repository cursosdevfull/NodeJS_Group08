import { Brackets, createConnection, getManager } from "typeorm";
import { Car } from "./entity/Car";
import { User } from "./entity/User";

createConnection().then(async (connection) => {
  console.log("Connection success");

  const userRepository = connection.getRepository(User);
  const userParameters = await userRepository
    .createQueryBuilder("user")
    .where("user.age = :age")
    .setParameters({ age: 30 })
    .getOne();

  console.log("userParameters", userParameters);

  const usersInRange = await userRepository
    .createQueryBuilder("user")
    /*  .where("user.age > 20 and user.age < 60") */
    /*.where("user.age > :ageMin and user.age < :ageMax", {
      ageMin: 20,
      ageMax: 60,
    })*/
    .where("user.age > :ageMin and user.age < :ageMax")
    .setParameters({ ageMin: 20, ageMax: 60 })
    .getMany();
  console.log("usersInRange", usersInRange);

  const ages = [30, 40];
  const usersInAge = await userRepository
    .createQueryBuilder("user")
    .where("user.age IN (:...ages)", { ages })
    .getMany();

  console.log("usersInAge", usersInAge);

  const usersWhereAnd = await userRepository
    .createQueryBuilder("user")
    .where("user.age > :ageMin")
    .andWhere("user.age < :ageMax")
    .setParameters({ ageMin: 20, ageMax: 60 })
    .getMany();
  console.log("usersWhereAnd", usersWhereAnd);

  const usersWhereOr = await userRepository
    .createQueryBuilder("user")
    .where("user.age = :age")
    .orWhere("user.name = :name")
    .setParameters({ age: 50, name: "Peter" })
    .getMany();
  console.log("usersWhereOr", usersWhereOr);

  const usersInBrackets = await userRepository
    .createQueryBuilder("user")
    .where("user.id = :id", { id: 1 })
    .orWhere(
      new Brackets((qb) => {
        qb.where("user.name = :name", { name: "Paola" }).orWhere(
          "user.age = :age",
          { age: 30 }
        );
      })
    )
    .getSql();

  console.log("usersInBrackets", usersInBrackets);

  const countUsers = await userRepository
    .createQueryBuilder("user")
    .select(["count(*) total", "sum(user.age) suma"])
    .getRawOne();

  console.log("countUsers", countUsers);

  const usersHaving = await userRepository
    .createQueryBuilder("user")
    .having("user.id > :id", { id: 1 })
    .getRawMany();

  console.log("usersHaving", usersHaving);

  const usersSorted = await userRepository
    .createQueryBuilder("user")
    .orderBy("user.lastname", "ASC")
    .addOrderBy("user.age", "DESC")
    .offset(1)
    .limit(2)
    .getMany();

  console.log("usersSorted", usersSorted);

  const usersLeftJoin = await userRepository
    .createQueryBuilder("user")
    .innerJoinAndSelect("user.cars", "car")
    //    .leftJoinAndSelect("user.cars", "car")
    .getMany();

  console.log("usersLeftJoin", usersLeftJoin);

  const entityManager = getManager();
  const listCars = await entityManager.query("select * from car");
  console.log("listCars", listCars);

  const listCarsSP = await entityManager.query("call listOfCars(2)");
  console.log("listCarsSP", listCarsSP);
});
