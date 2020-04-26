import dependencyManager from '../../libs/dependency-manager';
import DuplicatedUsernameError from '../errors/DuplicatedUsernameError';

export const create = async function createFn(data) {
  const usersRepository = dependencyManager.get('users.repository');
  const user = await usersRepository.getByUsername(data.username);
  if (user)
    throw new DuplicatedUsernameError(
      `The username ${data.username} is already registered`,
    );
  data.role = 'user';
  const result = await usersRepository.insert(data);
  return result;
};

export const getAll = async function getAllFn(limit = 0, start = 0) {
  const usersRepository = dependencyManager.get('users.repository');
  const result = await usersRepository.getAll(limit, start);
  return result;
};
