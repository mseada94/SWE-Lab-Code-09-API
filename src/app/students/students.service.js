import dependencyManager from '../../libs/dependency-manager';

export const create = async function createFn(data) {
  const studentsRepository = dependencyManager.get('students.repository');
  const result = await studentsRepository.insert(data);
  return result;
};

export const replace = async function replaceFn(id, data) {
  const studentsRepository = dependencyManager.get('students.repository');
  const result = await studentsRepository.replace(id, data);
  return result;
};

export const update = async function updateFn(id, data) {
  const studentsRepository = dependencyManager.get('students.repository');
  const result = await studentsRepository.update(id, data);
  return result;
};

export const remove = async function removeFn(id) {
  const studentsRepository = dependencyManager.get('students.repository');
  const result = await studentsRepository.remove(id);
  return result;
};

export const get = async function getFn(id) {
  const studentsRepository = dependencyManager.get('students.repository');
  const result = await studentsRepository.get(id);
  return result;
};

export const getAll = async function getAllFn(limit = 0, start = 0) {
  const studentsRepository = dependencyManager.get('students.repository');
  const result = await studentsRepository.getAll(limit, start);
  return result;
};
