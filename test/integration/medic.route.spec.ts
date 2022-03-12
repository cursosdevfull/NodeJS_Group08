import app from "../../src/app";
import request from "supertest";
import DatabaseBootstrap from "../../src/bootstrap/database.bootstrap";
import RedisBootstrap from "../../src/bootstrap/redis.bootstrap";

const tokenValid =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDcxMDM1MDAsImV4cCI6NzY0NzEwMzUwMCwibmFtZSI6IlNlcmdpbyIsImxhc3RuYW1lIjoiSGlkYWxnbyIsInJvbGVzIjpbeyJkYXRlQ3JlYXRlZCI6IjIwMjItMDItMDVUMTU6NDM6NDAuMDAwWiIsImRhdGVVcGRhdGVkIjoiMjAyMi0wMi0wNVQxNTo0NzoyMy4wMDBaIiwiYWN0aXZlIjp0cnVlLCJpZCI6MSwibmFtZSI6IkFETUlOIiwiYWN0aW9ucyI6Ik1FRElDU19MSVNULE1FRElDU19JTlNFUlQsTUVESUNTX1VQREFURSxNRURJQ1NfUEFHRSxNRURJQ1NfREVMRVRFLFVTRVJTX0xJU1QsVVNFUlNfSU5TRVJULFVTRVJTX1VQREFURSxVU0VSU19QQUdFLFVTRVJTX0RFTEVURSJ9XX0._BFm9Fu6KVuvP9lJU4_g3Qo8MI0bqCx6KXInb64HI1s";

const tokenCorrupt =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDcxMDM1MDAsImV4cCI6NzY0NzEwMzUwMCwibmFtZSI6IlNlcmdpbyIsImxhc3RuYW1lIjoiSGlkYWxnbyIsInJvbGVzIjpbeyJkYXRlQ3JlYXRlZCI6IjIwMjItMDItMDVUMTU6NDM6NDAuMDAwWiIsImRhdGVVcGRhdGVkIjoiMjAyMi0wMi0wNVQxNTo0NzoyMy4wMDBaIiwiYWN0aXZlIjp0cnVlLCJpZCI6MSwibmFtZSI6IkFETUlOIiwiYWN0aW9ucyI6Ik1FRElDU19MSVNULE1FRElDU19JTlNFUlQsTUVESUNTX1VQREFURSxNRURJQ1NfUEFHRSxNRURJQ1NfREVMRVRFLFVTRVJTX0xJU1QsVVNFUlNfSU5TRVJULFVTRVJTX1VQREFURSxVU0VSU19QQUdFLFVTRVJTX0RFTEVURSJ9XX0._BFm9Fu6KVuvP9lJU4_g3Qo8MI0bqCx6KXInb64HI";

const TIMEOUT = 24 * 60 * 60 * 1000;

const databaseBootstrap = new DatabaseBootstrap();
const redisBootstrap = new RedisBootstrap();

describe("medic.route", () => {
  beforeAll(async () => {
    await databaseBootstrap.initialize();
    await redisBootstrap.initialize();
  });

  afterAll(async () => {
    await databaseBootstrap.closeConnection();
    await redisBootstrap.closeConnection();
  });

  it(
    "get /medics without token",
    async () => {
      // Preparación
      const rq = request(app);

      // Ejecución
      const response: any = await rq.get("/medics");

      // Comprobación
      expect(response.status).toBe(401);
      // console.log(response);
      expect(response.res.statusMessage).toBe("Unauthorized");
    },
    TIMEOUT
  );

  it(
    "get /medics with token valid",
    async () => {
      // Preparación
      const rq = request(app);

      // Ejecución
      const response: any = await rq
        .get("/medics")
        .set("Authorization", `Bearer ${tokenValid}`);

      // Comprobación
      expect(response.status).toBe(200);

      console.log("response: " + JSON.stringify(response));

      expect(response.text).toHaveProperty("trace");
      expect(response.text).toHaveProperty("payload");
      expect(response.text).toHaveProperty("data");
      expect(response.text).toHaveProperty("data.accessToken");
      expect(response.text).toHaveProperty("data.refreshToken");
    },
    TIMEOUT
  );

  it(
    "get /medics with token invalid",
    async () => {
      // Preparación
      const rq = request(app);

      // Ejecución
      const response: any = await rq
        .get("/medics")
        .set("Authorization", `Bearer ${tokenCorrupt}`);

      // Comprobación
      expect(response.status).toBe(401);
      expect(response.res.statusMessage).toBe("Unauthorized");
    },
    TIMEOUT
  );
});
