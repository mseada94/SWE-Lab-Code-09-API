import { Router } from 'express';
import * as controller from './users.controller';
import { encryptPassword, hidePassword } from './users.middleware';
import grant from '../middlewares/grant';

const resource = '/users';
export const router = Router();

router
  .route(resource)
  .get(grant('admin'), controller.getAll)
  .post(encryptPassword, controller.create)
  .all(hidePassword);
