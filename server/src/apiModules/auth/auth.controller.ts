import {Application, Request, Response, NextFunction} from 'express';
import {Controller, Get, Post, Put, Delete, Validator} from '../baseController';
import {AuthService, Container} from './auth.service';
import * as authParams from './auth.parameters';
import * as validSchemas from './auth.validator';

const serviceInstance = Container.get(AuthService);

@Controller('')
export class AuthController {
  constructor(private app: Application) {}

  @Post('/auth')
  @Validator(validSchemas.createOneAuthValidator)
  async createOneAuth(
      req: Request,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.createOneAuth(
        authParams.CreateOneAuthRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
  @Delete('/auth/:id')
  @Validator(validSchemas.deleteOneAuthValidator)
  async deleteOneAuth(
      req: Request,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.deleteOneAuth(
        authParams.DeleteOneAuthRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
  @Put('/auth/:id')
  @Validator(validSchemas.updateOneAuthValidator)
  async updateOneAuth(
      req: Request,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.updateOneAuth(
        authParams.UpdateOneAuthRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/auths')
  @Validator(validSchemas.readManyAuthValidator)
  async readManyAuth(
      req: Request,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.readManyAuth(
        authParams.ReadManyAuthRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
}
