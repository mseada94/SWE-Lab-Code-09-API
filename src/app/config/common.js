import path from 'path';

export default {
  publicPath: path.resolve('./public'),
  host: 'localhost',
  port: '5000',
  mongoUrl: 'mongodb://localhost:27017',
  dbName: 'swe',
  secret: 'secret'
};
