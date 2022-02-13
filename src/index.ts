import DatabaseBootstrap from "@bootstrap/database.bootstrap";
import ServerBootstrap from "@bootstrap/server.bootstrap";
import RedisBootstrap from "@bootstrap/redis.bootstrap";
import app from "./app";

const serverBootstrap = new ServerBootstrap(app);
const databaseBootstrap = new DatabaseBootstrap();
const redisBootstrap = new RedisBootstrap();

(async () => {
  try {
    await serverBootstrap.initialize();
    await databaseBootstrap.initialize();
    await redisBootstrap.initialize();
  } catch (error) {
    console.log("error", error);
    databaseBootstrap.getConnection().close();
    redisBootstrap.getConnection().disconnect();
    process.exit(1);
  }
})();
