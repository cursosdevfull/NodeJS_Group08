import IBootstrap from "./bootstrap.interface";
import IORedis from "ioredis";
import yenv from "yenv";

const env = yenv();

let client: any;

export default class RedisBootstrap implements IBootstrap {
  private client: IORedis.Redis;

  initialize(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const connectionParams = {
        host: env.DATABASES.REDIS.HOST,
        port: env.DATABASES.REDIS.PORT,
        password: env.DATABASES.REDIS.PASS,
        maxRetriesPerRequest: 5,
      };

      this.client = new IORedis(connectionParams);

      this.client
        .on("connect", () => {
          console.log("Connected to Redis");
          resolve(true);
        })
        .on("error", (error) => {
          reject(error);
        });

      client = this.client;
    });
  }

  getConnection() {
    return this.client;
  }

  static async get(key: string) {
    return await client.get(key);
  }

  static async set(key: string, value: any) {
    await client.set(key, value, "PX", 24 * 60 * 60 * 1000);
  }

  static async clear(prefix: string = "") {
    const keys = await client.keys(prefix + "*"); // MEDIC_*
    const pipeline = client.pipeline();

    keys.forEach((key: string) => {
      pipeline.del(key);
    });

    return pipeline.exec();
  }
}
