import * as service from './users.service';
import * as model from './users.model';
import { handlerBuilder } from '../utilities/handlerBuilder';

export const getAll = handlerBuilder(async (query) => {
  return [200, await service.getAll(parseInt(query.limit || 0), parseInt(query.start || 0))];
});

export const create = handlerBuilder(async (query, params, body) => {
  model.validateCreate(body);
  return [201, await service.create(body)];
});
