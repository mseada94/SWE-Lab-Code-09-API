import * as service from './students.service';
import * as model from './students.model';
import { handlerBuilder } from '../utilities/handlerBuilder';

export const getAll = handlerBuilder(async (query) => {
  return [200, await service.getAll(parseInt(query.limit || 0), parseInt(query.start || 0))];
});

export const create = handlerBuilder(async (query, params, body) => {
  model.validateCreate(body);
  return [201, await service.create(body)];
});

export const get = handlerBuilder(async (query, params) => {
  return [200, await service.get(params.id)];
});

export const replace = handlerBuilder(async (query, params, body) => {
  model.validateReplace(body);
  return [200, await service.replace(params.id, body)];
});

export const update = handlerBuilder(async (query, params, body) => {
  model.validateUpdate(body);
  return [200, await service.update(params.id, body)];
});

export const remove = handlerBuilder(async (query, params) => {
  return [200, await service.remove(params.id)];
});
