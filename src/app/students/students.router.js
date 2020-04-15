import { Router } from 'express';
import * as controller from './students.controller';

const resource = '/students';
export const router = Router();

router.route(resource)
  .get(controller.getAll)
  .post(controller.create);

router
  .route(resource + '/:id')
  .get(controller.get)
  .put(controller.replace)
  .patch(controller.update)
  .delete(controller.remove);
