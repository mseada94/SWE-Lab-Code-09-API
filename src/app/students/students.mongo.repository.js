import dependencyManager from '../../libs/dependency-manager';
import { ObjectID } from 'mongodb';

const collection = 'students';
export class StudentsMongoRepository {
  constructor() {
    this.db = dependencyManager.get('mongo.client');
  }

  async insert(student) {
    const result = await this.db.collection(collection).insertOne(student);
    return result.ops[0];
  }

  async replace(id, student) {
    const result = await this.db
      .collection(collection)
      .findOneAndReplace({ _id: new ObjectID(id) }, student, {
        returnOriginal: false,
      });

    return result.value;
  }

  async update(id, student) {
    const result = await this.db
      .collection(collection)
      .findOneAndUpdate(
        { _id: new ObjectID(id) },
        { $set: student },
        { returnOriginal: false },
      );

    return result.value;
  }

  async remove(id) {
    const result = await this.db
      .collection(collection)
      .findOneAndDelete({ _id: new ObjectID(id) }, { returnOriginal: false });

    return result.value;
  }

  async get(id) {
    const result = await this.db
      .collection(collection)
      .findOne({ _id: new ObjectID(id) });
    return result;
  }

  async getAll(limit = 0, start = 0) {
    const result = await this.db
      .collection(collection)
      .find({}, { limit, skip: start });

    return result.toArray();
  }
}
