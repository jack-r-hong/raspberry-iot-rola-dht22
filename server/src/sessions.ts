
// eslint-disable-next-line no-unused-vars
import session, {Session} from 'express-session';
import redisStore from 'connect-redis';
import {redisClient} from './redisClient';
import {errors} from './errors';

export type UserInfo = {
    userId: string;
    userStatus: number;
    authRole: number;
}

declare module 'express-session' {
 // eslint-disable-next-line no-unused-vars
  interface Session {
    userInfo?: UserInfo
  }
}

const RedisStore = redisStore(session);

export const userInfoSession = session({
  secret: process.env['TOKEN_SECRET'] as string,
  store: new RedisStore({client: redisClient}),
  resave: false,
  saveUninitialized: false,
  name: 'userInfo',
  cookie: {
    httpOnly: true,
  },
});

export const userInfoSessionVerify = (
    userInfo: UserInfo,
) => {
  if (!userInfo) {
    throw new errors.AuthenticationFailedError('AuthenticationFailed');
  }
  return true;
};
