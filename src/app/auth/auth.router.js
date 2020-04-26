import { Router } from 'express';
import * as controller from './auth.controller';

const resource = '/auth';
export const router = Router();

router
  .route(resource)
  .post(controller.login);

