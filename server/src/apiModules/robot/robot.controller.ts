import {Application, Request, Response, NextFunction} from 'express';
import {Controller, Get, Post, Put, Delete, Validator} from '../baseController';
import {RobotService, Container} from './robot.service';
import * as robotParams from './robot.parameters';
import * as validSchemas from './robot.validator';

const serviceInstance = Container.get(RobotService);

@Controller('')
export class RobotController {
  constructor(private app: Application) {}

  @Get('/dht/:id')
  @Validator(validSchemas.readOneDHTDataValidator)
  async readOneDHTData(
      req: Request,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.readOneDHTData(
        robotParams.ReadOneDHTDataRequestConvert(
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
  @Put('/dht/:id')
  @Validator(validSchemas.createOneDHTDataValidator)
  async createOneDHTData(
      req: Request,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.createOneDHTData(
        robotParams.CreateOneDHTDataRequestConvert(
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
