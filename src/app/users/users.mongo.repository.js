import dependencyManager from '../../libs/dependency-manager';
import { ObjectID } from 'mongodb';

const collection = 'users';
export class UsersMongoRepository {
  constructor() {
    this.db = dependencyManager.get('mongo.client');
  }

  async insert(student) {
    const result = await this.db.collection(collection).insertOne(student);
    return result.ops[0];
  }

  async getByUsername(username) {
    const result = await this.db
      .collection(collection)
      .findOne({ username });
    return result;
  }

  async getAll(limit = 0, start = 0) {
    const result = await this.db
      .collection(collection)
      .find({}, { limit, skip: start });

    return result.toArray();
  }
}
