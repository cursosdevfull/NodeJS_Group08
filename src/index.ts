import ServerBootstrap from "./bootstrap/server.bootstrap";
import app from "./app";

const serverBootstrap = new ServerBootstrap(app);

/* const start = async () => {
  await serverBootstrap.initialize();
}; */

(async () => {
  try {
    await serverBootstrap.initialize();
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
})();

/* serverBootstrap.initialize().then(
  (resp) => {
    console.log("Server is OK");
  },
  (err) => console.log(err)
);
 */

/* const promiseServer = serverBootstrap.initialize();

promiseServer.then((resp) => {
  console.log("Server is OK");
});

promiseServer.catch((err) => console.log(err)); */
