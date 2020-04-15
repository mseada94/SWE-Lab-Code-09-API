import NotFoundError from '../errors/NotFoundError';

export class StudentsMemoryRepository {
  constructor() {
    this.lastId = 0;
    this.students = {};
  }

  async insert(student) {
    const id = ++this.lastId;
    this.students[id] = { ...student, id };
    return this.students[id];
  }

  async replace(id, student) {
    if (!this.students[id])
      throw new NotFoundError(`Student with id(${id}) is not founded`);

    this.students[id] = { ...student, id };
    return this.students[id];
  }

  async update(id, student) {
    if (!this.students[id])
      throw new NotFoundError(`Student with id(${id}) is not founded`);

    this.students[id] = { ...this.students[id], ...student, id };
    return this.students[id];
  }

  async remove(id) {
    if (!this.students[id])
      throw new NotFoundError(`Student with id(${id}) is not founded`);
    const student = this.students[id];
    delete this.students[id];
    return student;
  }

  async get(id) {
    if (!this.students[id])
      throw new NotFoundError(`Student with id(${id}) is not founded`);

    return this.students[id];
  }

  async getAll(limit = 0, start = 0) {
    const students = Object.values(this.students);
    limit = limit || students.length;
    return students.slice(start, start + limit);
  }
}
