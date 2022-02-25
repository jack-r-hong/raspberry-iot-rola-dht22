import {Application, Request, Response, NextFunction} from 'express';
import {Controller, Get, Post, Put, Delete, Validator} from '../baseController';
import {UserService, Container} from './user.service';
import * as userParams from './user.parameters';
import * as validSchemas from './user.validator';

const serviceInstance = Container.get(UserService);

@Controller('')
export class UserController {
  constructor(private app: Application) {}

  @Post('/user')
  @Validator(validSchemas.createOneUserValidator)
  async createOneUser(
      req: Request,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.createOneUser(
        userParams.CreateOneUserRequestConvert(
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
  @Post('/user/login')
  @Validator(validSchemas.loginUserValidator)
  async loginUser(
      req: Request,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.loginUser(
        userParams.LoginUserRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          // custom begin loginUser
          req.session.userInfo = {
            userId: result.id,
            userStatus: result.userStatus,
            authRole: result.auth.role,
          };
          res.end();

          // custom end loginUser
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/user/logout')
  @Validator(validSchemas.logoutUserValidator)
  async logoutUser(
      req: Request,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.logoutUser(
        userParams.LogoutUserRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          // custom begin logoutUser
          res.clearCookie('userInfo');
          req.session.destroy((err) => {});
          res.end();

          // custom end logoutUser
        }).catch((e) => {
          next(e);
        });
  }
  @Delete('/user/:id')
  @Validator(validSchemas.deleteOneUserValidator)
  async deleteOneUser(
      req: Request,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.deleteOneUser(
        userParams.DeleteOneUserRequestConvert(
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
  @Get('/user/:id')
  @Validator(validSchemas.readOneUserValidator)
  async readOneUser(
      req: Request,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.readOneUser(
        userParams.ReadOneUserRequestConvert(
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
  @Put('/user/:id')
  @Validator(validSchemas.updateOneUserValidator)
  async updateOneUser(
      req: Request,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.updateOneUser(
        userParams.UpdateOneUserRequestConvert(
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
  @Post('/users')
  @Validator(validSchemas.createManyUsersValidator)
  async createManyUsers(
      req: Request,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.createManyUsers(
        userParams.CreateManyUsersRequestConvert(
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
