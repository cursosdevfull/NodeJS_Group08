import DatabaseBootstrap from "@bootstrap/database.bootstrap";
import ServerBootstrap from "@bootstrap/server.bootstrap";
import app from "./app";

const serverBootstrap = new ServerBootstrap(app);
const databaseBootstrap = new DatabaseBootstrap();

(async () => {
  try {
    await serverBootstrap.initialize();
    await databaseBootstrap.initialize();
  } catch (error) {
    console.log("error", error);
    databaseBootstrap.getConnection().close();
    process.exit(1);
  }
})();
