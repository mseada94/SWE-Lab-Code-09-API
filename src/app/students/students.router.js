import { Router } from 'express';
import * as controller from './students.controller';
import grant from '../middlewares/grant';

const resource = '/students';
export const router = Router();

router.route(resource)
  .all(grant())
  .get(controller.getAll)
  .post(controller.create);

router
  .route(`${resource}/:id`)
  .all(grant())
  .get(controller.get)
  .put(controller.replace)
  .patch(controller.update)
  .delete(controller.remove);
