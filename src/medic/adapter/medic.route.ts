import RedisBootstrap from '../../bootstrap/redis.bootstrap';
import MedicUseCase from '../application/medic.usecase';
import MedicOperation from '../infraestructure/medic.operation';
import CacheRedis from '../../shared/middlewares/cache.middleware';
import { Validators } from '../../shared/middlewares/validate.middleware';
import express from 'express';
import MedicController from './medic.controller';
import { schemas } from './medic.schema';

const operation = new MedicOperation();
const useCase = new MedicUseCase(operation);
const controller = new MedicController(useCase, RedisBootstrap);

const route = express.Router();

route.get(
  '/',
  // CacheRedis.handle("MEDIC_LIST"),
  controller.list.bind(controller)
);
route.get('/unique', controller.getUniqueMedic.bind(controller));
route.get('/report', controller.getReportMedic.bind(controller));
route.get('/:id', controller.getOne.bind(controller));
route.get('/page/:page', controller.getPage.bind(controller));
route.post(
  '/',
  Validators.validate(schemas.INSERT),
  controller.insert.bind(controller)
);
route.put('/:id', controller.update.bind(controller));
route.delete('/:id', controller.delete.bind(controller));

export default route;
