import {Application, Request, Response, Router, RequestHandler, NextFunction}
  from 'express';
import {checkSchema, Schema, validationResult} from 'express-validator';

const vSymbol = Symbol('validator');

const subRouter = Router();

export function Controller(mainPath: string) {
  return <T extends { new(...args: any[]): {} }>(Base: T) =>{
    return class extends Base {
      constructor(...args: any[]) {
        super(...args);
        const app :Application = args[0];

        app.use(`/api/${mainPath}`, subRouter);
      }
    };
  };
}

enum Method{
  Get='get',
  Post='post',
  Put='put',
  Delete='delete'
}

export function Get(path: string) {
  return decoratorFactory(Method.Get, path);
}

export function Post(path: string) {
  return decoratorFactory(Method.Post, path);
}

export function Put(path: string) {
  return decoratorFactory(Method.Put, path);
}


export function Delete(path: string) {
  return decoratorFactory(Method.Delete, path);
}


function decoratorFactory(method :Method, path :string) {
  return (target: any, propertyKey:any, descriptor: PropertyDescriptor) => {
    const middlewares:RequestHandler[] = [];

    if (Reflect.hasOwnMetadata(vSymbol, target, propertyKey)) {
      const validator = Reflect.getMetadata(vSymbol, target, propertyKey);
      middlewares.push(validator);
    }

    subRouter[method](path, middlewares, bedRequestHandler, descriptor.value);
    return descriptor;
  };
};

const bedRequestHandler:RequestHandler =
(req: Request, res: Response, next: NextFunction) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors);
    return;
  }

  next();
};

export function Validator(schema: Schema) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (!Reflect.hasOwnMetadata(vSymbol, target, propertyKey)) {
      Reflect.defineMetadata(
          vSymbol, checkSchema(schema),
          target, propertyKey);
    }
  };
}
