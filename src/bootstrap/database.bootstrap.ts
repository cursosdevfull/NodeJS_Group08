import IBootstrap from "./bootstrap.interface";
import yenv from "yenv";
import { createConnection } from "typeorm";

const env = yenv();
let client: any;

export default class DatabaseBootstrap implements IBootstrap {
  async initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      const parametersConnection = {
        host: env.DATABASES.MYSQL.HOST,
        type: env.DATABASES.MYSQL.TYPE,
        username: env.DATABASES.MYSQL.USERNAME,
        password: env.DATABASES.MYSQL.PASSWORD,
        database: env.DATABASES.MYSQL.DATABASE,
        port: env.DATABASES.MYSQL.PORT,
        entities: env.DATABASES.MYSQL.ENTITIES,
        synchronize: env.DATABASES.MYSQL.SYNCHRONIZE,
        logging: env.DATABASES.MYSQL.LOGGING,
      };

      createConnection(parametersConnection).then(
        (connection) => {
          console.log("Connected to database");
          client = connection;
          resolve(true);
        },
        (error) => reject(error)
      );
    });
  }

  getConnection() {
    return client;
  }
}
