import express, { json, urlencoded, Router } from 'express';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import config from './config';
import students from './students';
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
  server.use(urlencoded({ extended: true }));

  // 2- Configure Resources Routers
  const api = Router();
  api.use(students);
  server.use('/api', api);

  // 3- Configure General-Middleware
  server.use(responseFormatter);

  // Start HTTP Server on a specific Port
  server.listen(config.port || 5000);
}
