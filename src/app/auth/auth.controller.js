import * as service from './auth.service';
import * as model from './auth.model';
import { handlerBuilder } from '../utilities/handlerBuilder';
import UnauthorizedError from '../errors/UnauthorizedError';

export const login = handlerBuilder(async (query, params, body) => {
  model.validateLogin(body);
  try {
    const res = await service.login(body);
    return [200, res, { token: res.token }];
  } catch (error) {
    console.log(error);
    throw new UnauthorizedError(
      'Unauthorized Access: Username or password is not correct',
    );
  }
});
