
import express, {Application, NextFunction, Request, Response} from 'express';
import {Result} from 'express-validator';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import httpErrors from 'http-errors';
import {registerController} from './apiModules';
import cookieParser from 'cookie-parser';
// import {userInfoSession} from './sessions';
import {errorHandle} from './errors';
// import session, {Session} from 'express-session';
// import redisStore from 'connect-redis';
// import {redisClient} from './redisClient';

// declare module 'express-session' {
//  interface Session {
//     userId: string;
//     userStatus: number;
//     authRole: number;
//   }
// }


export class ExpressApp {
  public app: Application = express();

  constructor() {
    this.middleware();
    this.sessionRegister();
    registerController(this.app);
    this.app.use(errorHandle);
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  }

  private middleware(): void {
    const corsOptions: cors.CorsOptions = {
      allowedHeaders: [
        'Origin',
        'Access-Control-Allow-Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
      ],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      // origin: '127.0.0.1',
      origin: '*',
      preflightContinue: false,
    };
    this.app.use(helmet());
    this.app.use(cors(corsOptions));


    this.app.use(compression());
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(bodyParser.json());
  }

  private sessionRegister() {
    // this.app.use(userInfoSession);
  }
}
