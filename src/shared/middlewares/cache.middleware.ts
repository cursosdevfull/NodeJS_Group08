import RedisBootstrap from "../../bootstrap/redis.bootstrap";
import { NextFunction, Request, Response } from "express";

export default class CacheRedis {
  static handle(prefix: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let key = prefix;

      if (req.params) {
        for (const prop in req.params) {
          key += `_${req.params[prop]}`;
        }
      }

      if (req.query) {
        for (const prop in req.query) {
          key += `_${req.query[prop]}`;
        }
      }

      if (req.body) {
        for (const prop in req.body) {
          key += `_${req.body[prop]}`;
        }
      }

      const results = await RedisBootstrap.get(key);

      if (results) {
        console.log("Ejecución desde Redis");
        res.json(JSON.parse(results));
      } else {
        res.locals.cacheKey = key;
        next();
      }
    };
  }
}
