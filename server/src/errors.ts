import httpErrors from 'http-errors';
import {Prisma} from '@prisma/client';
import {Result} from 'express-validator';
import {Request, Response, NextFunction} from 'express';

class WrongPasswordError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'WrongPasswordError';
  }
}

class NotFindError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NotFindError';
  }
}
class DuplicateUniqueField extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'DuplicateUniqueField';
  }
}

class AuthenticationFailedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AuthenticationFailedError';
  }
}

export const errors = {
  WrongPasswordError,
  NotFindError,
  DuplicateUniqueField,
  AuthenticationFailedError,
};

export const errorHandle = (
    err :httpErrors.HttpError | Result | Prisma.PrismaClientKnownRequestError,
    req :Request,
    res:Response,
    next: NextFunction,
) => {
  console.log(err);

  const error = (() => {
    switch (true) {
      case err instanceof Result:
        if (err instanceof Result) {
          const {param, location, msg} = err.array({
            onlyFirstError: true,
          })[0];

          if (
            param === 'userInfo' &&
            msg === 'AuthenticationFailed' &&
            location === 'cookies'
          ) {
            return httpErrors(403);
          }
        }

        return httpErrors(400);
      case err instanceof WrongPasswordError:
        return httpErrors(401);
      case err instanceof AuthenticationFailedError:
        return httpErrors(403);
      case err instanceof NotFindError:
        return httpErrors(404);
      case err instanceof DuplicateUniqueField:
        return httpErrors(409);
      case err instanceof Prisma.PrismaClientKnownRequestError:
        return prismaDBErrorHender(<Prisma.PrismaClientKnownRequestError> err);
      default:
        return httpErrors(500);
    }
  })();

  res.status(error.statusCode);
  res.send(`${error.statusCode} ${error.message}`);
};


export const errorHender = (err: Error |
  Prisma.PrismaClientKnownRequestError) => {
  switch (true) {
    case err instanceof WrongPasswordError:
      return httpErrors(401);
    case err instanceof AuthenticationFailedError:
      return httpErrors(403);
    case err instanceof NotFindError:
      return httpErrors(404);
    case err instanceof DuplicateUniqueField:
      return httpErrors(409);
    case err instanceof Prisma.PrismaClientKnownRequestError:
      return prismaDBErrorHender(<Prisma.PrismaClientKnownRequestError> err);
    default:
      return (err);
  }
};

const prismaDBErrorHender = (err: Prisma.PrismaClientKnownRequestError) => {
  console.log('db error', err);
  switch (err.code) {
    case 'P2002':
      return httpErrors(409);
    case 'P2003':
      return httpErrors(403);
    case 'P2025':
      return httpErrors(404);
    default:
      return httpErrors(500);
  }
};
