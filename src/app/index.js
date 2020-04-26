import express, { json, urlencoded, Router } from 'express';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import jwt from './middlewares/extract-jwt';

import config from './config';
import students from './students';
import users from './users';
import auth from './auth';
import { responseFormatter } from './middlewares';

export default function app() {
  const server = express();

  // 1- Configure General-Middleware
  // Host the public folder if configured
  if (config.publicPath) server.use('/', express.static(config.publicPath));

  // Enable security, CORS, compression, and body parsing
  server.use(helmet());
  server.use(cors());
  server.use(compress());
  server.use(json());
  server.use(cookieParser());
  server.use(urlencoded({ extended: true }));
  server.use(jwt(config.secret));
  
  // 2- Configure Resources Routers
  const api = Router();
  api.use(students);
  api.use(users);
  api.use(auth);
  server.use('/api', api);

  // 3- Configure General-Middleware
  server.use(responseFormatter);

  // Start HTTP Server on a specific Port
  server.listen(config.port || 5000);
}
