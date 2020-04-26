import { MongoClient } from 'mongodb';
import app from './app';
import config from './app/config';
import dependencyManager from './libs/dependency-manager';
import { StudentsMemoryRepository } from './app/students';
import { StudentsMongoRepository } from './app/students';
import { UsersMongoRepository } from './app/users';

async function registerDefaultDependencies() {
  const dbConnection = await MongoClient.connect(config.mongoUrl, {
    useNewUrlParser: true,
  });
  const mongoClient = dbConnection.db(config.dbName);

  dependencyManager.register('mongo.client', () => mongoClient, 'static');

  dependencyManager.register(
    'students.repository',
    () => new StudentsMongoRepository(),
    'singleton',
  );

  dependencyManager.register(
    'users.repository',
    () => new UsersMongoRepository(),
    'singleton',
  );
}

async function registerTestDependencies() {
  dependencyManager.register(
    'students.repository',
    () => new StudentsMemoryRepository(),
    'singleton',
  );
}

async function main() {
  switch (process.env.NODE_ENV) {
    case 'test':
      await registerTestDependencies();
      break;

    default:
      await registerDefaultDependencies();
      break;
  }

  app();
}

main();
