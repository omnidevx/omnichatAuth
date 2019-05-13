import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { routes } from './routes/index';

createConnection()
  .then(async connection => {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use('/', [authRouter, userRouter, routes]);

    app.listen(3000, () => {
      console.log('Server started on port 3000!');
    });
  })
  .catch(error => console.log(error));
