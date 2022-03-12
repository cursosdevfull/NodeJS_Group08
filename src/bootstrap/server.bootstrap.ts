import { Application } from 'express';
import http from 'http';
import IBootstrap from './bootstrap.interface';
import yenv from 'yenv';
import logger from '../shared/helpers/logging.helper';

const env = yenv();

export default class implements IBootstrap {
  constructor(private app: Application) {}

  initialize(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);
      console.log('NODE_ENV', process.env.NODE_ENV);
      server
        .listen(env.PORT)
        .on('listening', () => {
          logger.info('Server is listening on port ' + env.PORT);
          resolve('Server is OK');
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
